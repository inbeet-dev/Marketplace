'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const User = use('App/Models/User')
const Project = use('App/Models/Project')
const ProjectQuestion = use('App/Models/ProjectQuestion')
const LumberListBid = use('App/Models/LumberListBid')
const LumberList = use('App/Models/LumberList')
const Database = use('Database')
const { validate } = use('Validator')
const ServerException = use('App/Exceptions/ServerException')
const { save } = use('App/Utils/dbFunctions')

class AdminController {
  async addEmployee({ request, response, auth }) {
    await authenticate.admin(response, auth)

    const rules = {
      name: 'required',
      address: 'required',
      email: 'required|email',
      phone: 'required',
      password: 'required',
      role: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails())
      throw new ServerException(validation.messages(), 400)

    const { name, address, email, phone, password, role } = request.all()

    const user = new User()

    if (
      ![
        User.ROLES.estimator,
        User.ROLES.supportCustomer,
        User.ROLES.admin
      ].includes(role)
    )
      throw new ServerException('Role is invalid', 400)

    user.name = name
    user.email = email
    user.password = password
    user.role = role
    user.meta = { address, phoneNumber: phone }

    await save(user, response)

    return {
      success: true
    }
  }

  async dashboard({ response, auth }) {
    await authenticate.admin(response, auth)

    const projectsCount = await Project.getCount()

    const questionCount = await ProjectQuestion.getCount()

    const activeSupplierCount = await User.query()
      .where({ role: User.ROLES.supplier, status: User.STATUS.active })
      .getCount()

    const inActiveSupplierCount = await User.query()
      .where({ role: User.ROLES.supplier, status: User.STATUS.deActive })
      .getCount()

    const inReviewSupplierCount = await User.query()
      .where({ role: User.ROLES.supplier, status: User.STATUS.inReview })
      .getCount()

    const openBidsCount = await LumberListBid.query()
      .where('status', LumberListBid.STATUS.open)
      .getCount()

    const pausedBidsCount = await LumberListBid.query()
      .where('status', LumberListBid.STATUS.paused)
      .getCount()

    const completedBidsCount = await LumberListBid.query()
      .where('status', LumberListBid.STATUS.complete)
      .getCount()

    const cancelledBidsCount = await LumberListBid.query()
      .where('status', LumberListBid.STATUS.cancel)
      .getCount()

    const inReviewLumberListCount = await LumberList.query()
      .where('status', LumberList.STATUS.inReview)
      .getCount()

    const receivedLumberListCount = await LumberList.query()
      .where('status', LumberList.STATUS.received)
      .getCount()

    const awaitingManagerApprovalLumberListCount = await LumberList.query()
      .where('status', LumberList.STATUS.Awaiting)
      .getCount()

    const { rows: customerRows } = await Database.raw(
      `SELECT count(id)
      FROM users
      WHERE extract(week from created_at) = extract(week from current_date)
      AND extract(year from created_at) = extract(year from current_date) AND role = ?;`,
      [User.ROLES.customer]
    )
    const { count: customersInWeek } = customerRows[0]

    const { rows: lumberListBidRows } = await Database.raw(`SELECT count(id)
    FROM lumber_list_bids
    WHERE extract(week from updated_at) = extract(week from current_date)
    AND extract(year from updated_at) = extract(year from current_date);`)
    const { count: newBidSubmittedInWeek } = lumberListBidRows[0]

    const newBidsSubmitted = await LumberListBid.query()

    const bidAccepted = await LumberListBid.query().where(
      'status',
      LumberListBid.STATUS.accept
    )

    const { rows: acceptedBidRows } = await Database.raw(
      `SELECT count(id)
      FROM lumber_list_bids
      WHERE extract(week from updated_at) = extract(week from current_date)
      AND extract(year from updated_at) = extract(year from current_date) AND status=?;`,
      [LumberListBid.STATUS.accept]
    )
    const { count: acceptedBidInWeek } = acceptedBidRows[0]

    const { rows: acceptedBidsWithAmountRows } = await Database.raw(
      `select sum(amount)
      from lumber_list_bids left join lumber_list_bid_items on lumber_list_bid_items.lumber_list_bid_id = lumber_list_bids.id
      where lumber_list_bids.status = ?`,
      [LumberListBid.STATUS.accept]
    )

    const { sum: totalAmount } = acceptedBidsWithAmountRows[0]

    const {
      rows: acceptedWeeklyBidsWithAmountRows
    } = await Database.raw(`select sum(amount)
    from lumber_list_bids left join lumber_list_bid_items on lumber_list_bid_items.lumber_list_bid_id = lumber_list_bids.id
    where lumber_list_bids.status = 'Accept Bid' AND extract(week from lumber_list_bids.updated_at) = extract(week from current_date)
    AND extract(year from lumber_list_bids.updated_at) = extract(year from current_date);`)

    const { sum: weeklyAmount } = acceptedWeeklyBidsWithAmountRows[0]

    const customers = await User.query().where('role', User.ROLES.customer)

    const completeLumberList = await LumberList.query().where(
      'status',
      LumberList.STATUS.complete
    )

    return {
      success: true,
      data: {
        statistics: {
          week: {
            newCustomers: Number(customersInWeek),
            newBidsSubmitted: Number(newBidSubmittedInWeek),
            bidAccepted: Number(acceptedBidInWeek),
            acceptedProjectsPrice: Number(weeklyAmount)
          },
          total: {
            newCustomers: customers.length,
            newBidsSubmitted: newBidsSubmitted.length,
            bidAccepted: bidAccepted.length,
            acceptedProjectsPrice: Number(totalAmount)
          }
        },
        lumberLists: {
          inReview: Number(inReviewLumberListCount),
          received: Number(receivedLumberListCount),
          awaitingManagerApproval: Number(
            awaitingManagerApprovalLumberListCount
          ),
          complete: Number(completeLumberList)
        },
        bids: {
          openBids: Number(openBidsCount),
          pausedBids: Number(pausedBidsCount),
          completedBids: Number(completedBidsCount),
          cancelledBids: Number(cancelledBidsCount)
        },
        suppliers: {
          active: Number(activeSupplierCount),
          inActive: Number(inActiveSupplierCount),
          inReview: Number(inReviewSupplierCount)
        },
        customers: {
          count: customers.length,
          projects: Number(projectsCount),
          questions: Number(questionCount)
        }
      }
    }
  }
}

module.exports = AdminController
