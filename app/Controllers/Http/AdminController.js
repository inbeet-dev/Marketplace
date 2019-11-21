'use strict'

const Auth = use('App/Utils/authenticate')
const authenticate = new Auth()
const User = use('App/Models/User')
const Project = use('App/Models/Project')
const ProjectQuestion = use('App/Models/ProjectQuestion')
const LumberListBid = use('App/Models/LumberListBid')
const LumberList = use('App/Models/LumberList')
const Database = use('Database')
require('datejs')

class AdminController {
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

    const { rowCount: customersInWeek } = await Database.raw(`SELECT id
    FROM users
    WHERE extract(week from created_at) = extract(week from current_date)
    AND extract(year from created_at) = extract(year from current_date) AND role = 'customer';`)

    // eslint-disable-next-line no-var
    var newBidSubmittedInWeek = 0
    const newBidsSubmitted = await LumberListBid.query()
    await newBidsSubmitted.map((bid) => {
      const time = bid.created_at

      if (
        time.getTime() >= Date.monday().getTime() &&
        time.getTime() <=
          Date.next()
            .sunday()
            .getTime()
      ) {
        newBidSubmittedInWeek++
      }
    })

    const bidAccepted = await LumberListBid.query().where(
      'status',
      LumberListBid.STATUS.accept
    )

    // eslint-disable-next-line no-var
    var acceptedBidInWeek = 0
    await bidAccepted.map((bid) => {
      const time = bid.updated_at

      if (
        time.getTime() >= Date.monday().getTime() &&
        time.getTime() <=
          Date.next()
            .sunday()
            .getTime()
      ) {
        acceptedBidInWeek++
      }
    })

    const acceptedBidsWithAmount = await Database.select(
      'lumber_list_bids.status',
      'lumber_list_bids.updated_at',
      'amount'
    )
      .from('lumber_list_bids')
      .leftJoin(
        'lumber_list_bid_items',
        'lumber_list_bid_items.lumber_list_bid_id',
        'lumber_list_bids.id'
      )
      .where('lumber_list_bids.status', 'Accept Bid')

    // eslint-disable-next-line no-var
    var totalAmount = 0
    // eslint-disable-next-line no-var
    var weeklyAmount = 0
    await acceptedBidsWithAmount.map((bid) => {
      totalAmount += bid.amount
      const time = bid.updated_at

      if (
        time.getTime() >= Date.monday().getTime() &&
        time.getTime() <=
          Date.next()
            .sunday()
            .getTime()
      ) {
        weeklyAmount += bid.amount
      }
    })

    const customers = await User.query().where('role', User.ROLES.customer)

    return {
      success: true,
      data: {
        statistics: {
          week: {
            newCustomers: customersInWeek,
            newBidsSubmitted: newBidSubmittedInWeek,
            bidAccepted: acceptedBidInWeek,
            acceptedProjectsPrice: weeklyAmount
          },
          total: {
            newCustomers: customers.length,
            newBidsSubmitted: newBidsSubmitted.length,
            bidAccepted: bidAccepted.length,
            acceptedProjectsPrice: totalAmount
          }
        },
        lumberLists: {
          inReview: Number(inReviewLumberListCount),
          received: Number(receivedLumberListCount),
          awaitingManagerApproval: Number(
            awaitingManagerApprovalLumberListCount
          )
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
