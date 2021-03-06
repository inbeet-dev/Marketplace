'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')
Route.get('/emails/:name', function({ params, view }) {
  return view.render(`emails.${params.name}`)
})
Route.group(() => {
  Route.post('login', 'UserController.login')
  Route.post('register', 'UserController.register')
  Route.get('dashboard', 'UserController.dashboard')
}).prefix('api/v1/user')

Route.group(() => {
  Route.post('register', 'ProjectController.register')
  Route.post('upload', 'ProjectController.upload')
  Route.put('close', 'ProjectController.close')
  Route.get(':id', 'ProjectController.getProject')
  Route.get(':id/plans', 'ProjectController.plans')
  Route.get(':id/list', 'ProjectController.getList')
  Route.get(':id/questions', 'QuestionController.getQuestions')
  Route.get(':id/answers', 'QuestionController.getAnswers')
  Route.put('changestatus/approval', 'ProjectController.setStatusApproval')
  Route.put('notify', 'ProjectController.changeNotification')
  Route.put('cancel', 'ProjectController.cancelProject')
  Route.put('hold', 'ProjectController.onHoldProject')
  Route.get(':id/bid', 'ProjectController.getProjectBid')
  Route.put('despoit', 'ProjectController.despoit')
  Route.get(':id/suppliers', 'ProjectController.getSuppliers')
}).prefix('api/v1/project')

Route.group(() => {
  Route.post('create', 'QuestionController.createQuestion')
  Route.get(':id', 'QuestionController.getQuestion')
  Route.put('answer', 'QuestionController.addAnswer')
  Route.put('answerall', 'QuestionController.answerAll')
}).prefix('api/v1/project/question')

Route.group(() => {
  Route.post('register', 'SupplierController.regiter')
  Route.post('bid', 'SupplierController.submitBid')
  Route.get('dashboard', 'SupplierController.dashboard')
  Route.get('', 'SupplierController.getSuppliers')
  Route.put('', 'SupplierController.changeStatus')
}).prefix('api/v1/supplier')

Route.group(() => {
  Route.post('item', 'LumberListController.addItems')
}).prefix('api/v1/lumberlist')

Route.group(() => {
  Route.get('dashboard', 'EstimatorController.dashboard')
}).prefix('api/v1/estimator')

Route.group(() => {
  Route.get('dashboard', 'AdminController.dashboard')
  Route.get('employee', 'AdminController.getEmployees')
  Route.get('lumberlist', 'AdminController.getLumberListForApproval')
  Route.get('lumberlist/:id', 'AdminController.getLumberListItemForApproval')
  Route.post('employee', 'AdminController.addEmployee')
  Route.put('employee/role', 'AdminController.changeRole')
  Route.put('employee/status', 'AdminController.changeStatus')
  Route.put('lumberlist', 'AdminController.approvalLumberList')
}).prefix('api/v1/admin')

Route.group(() => {
  Route.get('dashboard', 'CustomerSupportController.dashboard')
  Route.get('projects', 'CustomerSupportController.projects')
  Route.get('projects/:id', 'CustomerSupportController.project')
  Route.get('customers', 'CustomerSupportController.customers')
  Route.get('customers/:id', 'CustomerSupportController.customer')
  Route.get(
    'customers/:userid/:projectid',
    'CustomerSupportController.getCustomerWithProject'
  )
  Route.get('vendors/:id', 'CustomerSupportController.vendor')
  Route.post('vendors', 'CustomerSupportController.getVendorsByDistance')
  Route.post('vendors/add', 'CustomerSupportController.addSupplierToProject')
  Route.get('vendors', 'CustomerSupportController.vendors')
}).prefix('api/v1/customer-support')

Route.any('*', 'NuxtController.render')
