export function TradeTime({
	hour,
	minute
}) {
	return arguments[0];
}
export function TradeDate({
	year,
	month,
	day
}) {
	return arguments[0];
}
export function AcceptTradingPermission({
	tradingPermissionId
}) {
	return arguments[0];
}
export function AccessTokenRequest({
	name,
	password,
	appId,
	appVersion,
	deviceId,
	cid,
	sec
}) {
	return arguments[0];
}
export function AccessTokenResponse({
	errorText,
	accessToken,
	expirationTime,
	passwordExpirationTime,
	userStatus,
	userId,
	name,
	hasLive
}) {
	return arguments[0];
}
export function Account({
	id,
	name,
	userId,
	accountType,
	active,
	clearingHouseId,
	riskCategoryId,
	autoLiqProfileId,
	marginAccountType,
	legalStatus,
	readonly
}) {
	return arguments[0];
}
export function AccountRiskStatus({
	id,
	adminAction,
	adminTimestamp,
	liquidateOnly,
	userTriggeredLiqOnly
}) {
	return arguments[0];
}
export function ActivateSecondMarketDataSubscriptionRenewal({
	secondMarketDataSubscriptionId
}) {
	return arguments[0];
}
export function AddEntitlementSubscription({
	entitlementId,
	creditCardId,
	accountId,
	userId
}) {
	return arguments[0];
}
export function AddMarketDataSubscription({
	marketDataSubscriptionPlanIds,
	year,
	month,
	creditCardId,
	accountId,
	userId
}) {
	return arguments[0];
}
export function AddSecondMarketDataSubscription({
	year,
	month,
	creditCardId,
	accountId,
	userId
}) {
	return arguments[0];
}
export function AddTradovateSubscription({
	tradovateSubscriptionPlanId,
	creditCardId,
	accountId,
	userId
}) {
	return arguments[0];
}
export function AdminAlert({
	id,
	name,
	timestamp
}) {
	return arguments[0];
}
export function AdminAlertSignal({
	id,
	timestamp,
	adminAlertId,
	relatedToAccountId,
	relatedToUserId,
	ownedByAdminId,
	completed,
	text,
	emailSent,
	subjectId
}) {
	return arguments[0];
}
export function AdminAlertSignalResponse({
	errorText,
	adminAlertSignal
}) {
	return arguments[0];
}
export function Alert({
	id,
	timestamp,
	userId,
	status,
	expression,
	validUntil,
	triggerLimits,
	triggeredCounter,
	failure,
	message
}) {
	return arguments[0];
}
export function AlertResponse({
	errorText,
	alert
}) {
	return arguments[0];
}
export function AlertSignal({
	id,
	timestamp,
	alertId,
	isRead,
	text
}) {
	return arguments[0];
}
export function CancelOrder({
	orderId,
	clOrdId,
	activationTime,
	customTag50,
	isAutomated
}) {
	return arguments[0];
}
export function CancelSecondMarketDataSubscription({
	secondMarketDataSubscriptionId
}) {
	return arguments[0];
}
export function CancelSecondMarketDataSubscriptionRenewal({
	secondMarketDataSubscriptionId
}) {
	return arguments[0];
}
export function CancelTradovateSubscription({
	tradovateSubscriptionId,
	cancelReason
}) {
	return arguments[0];
}
export function CashBalance({
	id,
	accountId,
	timestamp,
	tradeDate,
	currencyId,
	amount,
	realizedPnL,
	weekRealizedPnL
}) {
	return arguments[0];
}
export function CashBalanceLog({
	id,
	accountId,
	timestamp,
	tradeDate,
	currencyId,
	amount,
	realizedPnL,
	weekRealizedPnL,
	cashChangeType,
	fillPairId,
	fillId,
	fundTransactionId,
	comment,
	delta
}) {
	return arguments[0];
}
export function CashBalanceSnapshot({
	errorText,
	totalCashValue,
	totalPnL,
	initialMargin,
	maintenanceMargin,
	netLiq,
	openPnL,
	realizedPnL,
	weekRealizedPnL
}) {
	return arguments[0];
}
export function ChangePluginPermission({
	userId,
	pluginName,
	approval
}) {
	return arguments[0];
}
export function ChangeSpeed({
	speed
}) {
	return arguments[0];
}
export function Chat({
	id,
	userId,
	timestamp,
	category,
	assignedSupportId,
	closedById,
	closeTimestamp
}) {
	return arguments[0];
}
export function ChatMessage({
	id,
	timestamp,
	chatId,
	senderId,
	senderName,
	text,
	readStatus
}) {
	return arguments[0];
}
export function ChatMessageResponse({
	errorText,
	chatMessage
}) {
	return arguments[0];
}
export function ChatResponse({
	errorText,
	chat
}) {
	return arguments[0];
}
export function CheckReplaySession({
	startTimestamp
}) {
	return arguments[0];
}
export function CheckReplaySessionResponse({
	checkStatus,
	startTimestamp
}) {
	return arguments[0];
}
export function ClearingHouse({
	id,
	name
}) {
	return arguments[0];
}
export function CloseChat({
	chatId
}) {
	return arguments[0];
}
export function Command({
	id,
	orderId,
	timestamp,
	clOrdId,
	commandType,
	commandStatus,
	senderId,
	userSessionId,
	activationTime,
	customTag50,
	isAutomated
}) {
	return arguments[0];
}
export function CommandReport({
	id,
	commandId,
	timestamp,
	commandStatus,
	rejectReason,
	text,
	ordStatus
}) {
	return arguments[0];
}
export function CommandResult({
	failureReason,
	failureText,
	commandId
}) {
	return arguments[0];
}
export function CompleteAlertSignal({
	adminAlertSignalId
}) {
	return arguments[0];
}
export function ContactInfo({
	id,
	userId,
	firstName,
	lastName,
	streetAddress1,
	streetAddress2,
	city,
	state,
	postCode,
	country,
	phone,
	mailingIsDifferent,
	mailingStreetAddress1,
	mailingStreetAddress2,
	mailingCity,
	mailingState,
	mailingPostCode,
	mailingCountry
}) {
	return arguments[0];
}
export function Contract({
	id,
	name,
	contractMaturityId
}) {
	return arguments[0];
}
export function ContractGroup({
	id,
	name
}) {
	return arguments[0];
}
export function ContractMargin({
	id,
	initialMargin,
	maintenanceMargin,
	timestamp
}) {
	return arguments[0];
}
export function ContractMaturity({
	id,
	productId,
	expirationMonth,
	expirationDate,
	firstIntentDate,
	underlyingId,
	isFront
}) {
	return arguments[0];
}
export function CreateAlert({
	expression,
	validUntil,
	triggerLimits,
	message
}) {
	return arguments[0];
}
export function Currency({
	id,
	name,
	symbol
}) {
	return arguments[0];
}
export function CurrencyRate({
	id,
	timestamp,
	rate
}) {
	return arguments[0];
}
export function DeleteAlert({
	alertId
}) {
	return arguments[0];
}
export function DeleteResultResponse({
	errorText,
	success
}) {
	return arguments[0];
}
export function DeleteUserAccountPositionLimit({
	userAccountPositionLimitId
}) {
	return arguments[0];
}
export function DeleteUserAccountRiskParameter({
	userAccountRiskParameterId
}) {
	return arguments[0];
}
export function DismissAlert({
	alertId
}) {
	return arguments[0];
}
export function Entitlement({
	id,
	title,
	price,
	startDate,
	discontinuedDate,
	name,
	duration,
	durationUnits,
	autorenewal
}) {
	return arguments[0];
}
export function EntitlementSubscriptionResponse({
	errorText,
	errorCode,
	entitlementSubscription
}) {
	return arguments[0];
}
export function Exchange({
	id,
	name
}) {
	return arguments[0];
}
export function ExecutionReport({
	id,
	commandId,
	name,
	accountId,
	contractId,
	timestamp,
	tradeDate,
	orderId,
	execType,
	execRefId,
	ordStatus,
	action,
	cumQty,
	avgPx,
	lastQty,
	lastPx,
	rejectReason,
	text,
	exchangeOrderId
}) {
	return arguments[0];
}
export function Fill({
	id,
	orderId,
	contractId,
	timestamp,
	tradeDate,
	action,
	qty,
	price,
	active,
	finallyPaired
}) {
	return arguments[0];
}
export function FillFee({
	id,
	clearingFee,
	clearingCurrencyId,
	exchangeFee,
	exchangeCurrencyId,
	nfaFee,
	nfaCurrencyId,
	brokerageFee,
	brokerageCurrencyId,
	ipFee,
	ipCurrencyId,
	commission,
	commissionCurrencyId,
	orderRoutingFee,
	orderRoutingCurrencyId
}) {
	return arguments[0];
}
export function FillPair({
	id,
	positionId,
	buyFillId,
	sellFillId,
	qty,
	buyPrice,
	sellPrice,
	active
}) {
	return arguments[0];
}
export function GetAccountTradingPermissions({
	accountId
}) {
	return arguments[0];
}
export function GetCashBalanceSnapshot({
	accountId
}) {
	return arguments[0];
}
export function GetProductFeeParams({
	productIds
}) {
	return arguments[0];
}
export function GetSecondMarketDataSubscriptionCost({
	year,
	month,
	userId
}) {
	return arguments[0];
}
export function InitializeClock({
	startTimestamp,
	speed,
	initialBalance
}) {
	return arguments[0];
}
export function InterruptOrderStrategy({
	orderStrategyId
}) {
	return arguments[0];
}
export function LiquidatePosition({
	accountId,
	contractId,
	admin,
	customTag50
}) {
	return arguments[0];
}
export function MarginSnapshot({
	id,
	timestamp,
	riskTimePeriodId,
	initialMargin,
	maintenanceMargin,
	autoLiqLevel,
	liqOnlyLevel,
	totalUsedMargin,
	fullInitialMargin
}) {
	return arguments[0];
}
export function MarkAsReadChatMessage({
	chatMessageId
}) {
	return arguments[0];
}
export function MarkReadAlertSignal({
	alertId,
	alertSignalId
}) {
	return arguments[0];
}
export function MarketDataSubscription({
	id,
	userId,
	timestamp,
	planPrice,
	creditCardTransactionId,
	cashBalanceLogId,
	creditCardId,
	accountId,
	marketDataSubscriptionPlanId,
	year,
	month,
	renewalCreditCardId,
	renewalAccountId
}) {
	return arguments[0];
}
export function MarketDataSubscriptionExchangeScope({
	id,
	name,
	bundleOf
}) {
	return arguments[0];
}
export function MarketDataSubscriptionPlan({
	id,
	name,
	title,
	price,
	startDate,
	discontinuedDate,
	exchangeScopeId,
	dataType,
	professional,
	tooltip
}) {
	return arguments[0];
}
export function MarketDataSubscriptionResponse({
	errorText,
	errorCode,
	marketDataSubscription
}) {
	return arguments[0];
}
export function Me({
}) {
	return arguments[0];
}
export function ModifyAlert({
	alertId,
	expression,
	validUntil,
	triggerLimits,
	message
}) {
	return arguments[0];
}
export function ModifyCredentials({
	userId,
	name,
	password,
	currentPassword
}) {
	return arguments[0];
}
export function ModifyEmailAddress({
	userId,
	email
}) {
	return arguments[0];
}
export function ModifyOrder({
	orderId,
	clOrdId,
	orderQty,
	orderType,
	price,
	stopPrice,
	maxShow,
	pegDifference,
	timeInForce,
	expireTime,
	text,
	activationTime,
	customTag50,
	isAutomated
}) {
	return arguments[0];
}
export function ModifyOrderStrategy({
	orderStrategyId,
	command,
	customTag50
}) {
	return arguments[0];
}
export function ModifyPassword({
	userId,
	password,
	currentPassword
}) {
	return arguments[0];
}
export function OAuthMeResponse({
	errorText,
	userId,
	name,
	fullName,
	email,
	emailVerified,
	isTrial
}) {
	return arguments[0];
}
export function OAuthToken({
	grant_type,
	code,
	redirect_uri,
	client_id,
	client_secret,
	httpAuth
}) {
	return arguments[0];
}
export function OAuthTokenResponse({
	access_token,
	token_type,
	expires_in,
	error,
	error_description
}) {
	return arguments[0];
}
export function OpenDemoAccount({
	templateAccountId,
	name,
	initialBalance
}) {
	return arguments[0];
}
export function OpenDemoAccountResponse({
	errorText,
	accountId
}) {
	return arguments[0];
}
export function Order({
	id,
	accountId,
	contractId,
	spreadDefinitionId,
	timestamp,
	action,
	ordStatus,
	executionProviderId,
	ocoId,
	parentId,
	linkedId,
	admin
}) {
	return arguments[0];
}
export function OrderStrategy({
	id,
	accountId,
	timestamp,
	contractId,
	orderStrategyTypeId,
	initiatorId,
	action,
	params,
	uuid,
	status,
	failureMessage,
	senderId,
	customTag50
}) {
	return arguments[0];
}
export function OrderStrategyLink({
	id,
	orderStrategyId,
	orderId,
	label
}) {
	return arguments[0];
}
export function OrderStrategyStatusResponse({
	errorText,
	orderStrategy
}) {
	return arguments[0];
}
export function OrderStrategyType({
	id,
	name,
	enabled
}) {
	return arguments[0];
}
export function OrderVersion({
	id,
	orderId,
	orderQty,
	orderType,
	price,
	stopPrice,
	maxShow,
	pegDifference,
	timeInForce,
	expireTime,
	text
}) {
	return arguments[0];
}
export function Organization({
	id,
	name
}) {
	return arguments[0];
}
export function PlaceOCO({
	accountSpec,
	accountId,
	clOrdId,
	action,
	symbol,
	orderQty,
	orderType,
	price,
	stopPrice,
	maxShow,
	pegDifference,
	timeInForce,
	expireTime,
	text,
	activationTime,
	customTag50,
	isAutomated,
	other
}) {
	return arguments[0];
}
export function PlaceOSO({
	accountSpec,
	accountId,
	clOrdId,
	action,
	symbol,
	orderQty,
	orderType,
	price,
	stopPrice,
	maxShow,
	pegDifference,
	timeInForce,
	expireTime,
	text,
	activationTime,
	customTag50,
	isAutomated,
	bracket1,
	bracket2
}) {
	return arguments[0];
}
export function PlaceOcoResult({
	failureReason,
	failureText,
	orderId,
	ocoId
}) {
	return arguments[0];
}
export function PlaceOrder({
	accountSpec,
	accountId,
	clOrdId,
	action,
	symbol,
	orderQty,
	orderType,
	price,
	stopPrice,
	maxShow,
	pegDifference,
	timeInForce,
	expireTime,
	text,
	activationTime,
	customTag50,
	isAutomated
}) {
	return arguments[0];
}
export function PlaceOrderResult({
	failureReason,
	failureText,
	orderId
}) {
	return arguments[0];
}
export function PlaceOsoResult({
	failureReason,
	failureText,
	orderId,
	oso1Id,
	oso2Id
}) {
	return arguments[0];
}
export function Position({
	id,
	accountId,
	contractId,
	timestamp,
	tradeDate,
	netPos,
	netPrice,
	bought,
	boughtValue,
	sold,
	soldValue,
	prevPos,
	prevPrice
}) {
	return arguments[0];
}
export function PostChatMessage({
	userId,
	category,
	text
}) {
	return arguments[0];
}
export function Product({
	id,
	name,
	currencyId,
	productType,
	description,
	exchangeId,
	contractGroupId,
	riskDiscountContractGroupId,
	status,
	months,
	isSecured,
	valuePerPoint,
	priceFormatType,
	priceFormat,
	tickSize
}) {
	return arguments[0];
}
export function ProductFeeParams({
	clearingFee,
	clearingCurrencyId,
	exchangeFee,
	exchangeCurrencyId,
	nfaFee,
	nfaCurrencyId,
	brokerageFee,
	brokerageCurrencyId,
	ipFee,
	ipCurrencyId,
	commission,
	commissionCurrencyId,
	orderRoutingFee,
	orderRoutingCurrencyId,
	productId,
	dayMargin,
	nightMargin,
	fullMargin
}) {
	return arguments[0];
}
export function ProductFeeParamsResponse({
	params
}) {
	return arguments[0];
}
export function ProductMargin({
	id,
	initialMargin,
	maintenanceMargin,
	timestamp
}) {
	return arguments[0];
}
export function ProductSession({
	id,
	openTime,
	startTime,
	stopTime,
	closeTime,
	sundayOpenTime
}) {
	return arguments[0];
}
export function Property({
	id,
	name,
	propertyType,
	enumOptions,
	defaultValue
}) {
	return arguments[0];
}
export function RenewAccessToken({
}) {
	return arguments[0];
}
export function RequestTradingPermission({
	accountId,
	ctaContact,
	ctaEmail
}) {
	return arguments[0];
}
export function ResetAlert({
	alertId
}) {
	return arguments[0];
}
export function RestrainedOrderVersion({
	action,
	clOrdId,
	orderType,
	price,
	stopPrice,
	maxShow,
	pegDifference,
	timeInForce,
	expireTime,
	text
}) {
	return arguments[0];
}
export function RevokeTradingPermission({
	tradingPermissionId
}) {
	return arguments[0];
}
export function RollContract({
	name,
	forward,
	ifExpired
}) {
	return arguments[0];
}
export function RollContractResponse({
	errorText,
	contract
}) {
	return arguments[0];
}
export function SecondMarketDataSubscription({
	id,
	userId,
	timestamp,
	year,
	month,
	cancelledRenewal,
	cancellationTimestamp
}) {
	return arguments[0];
}
export function SecondMarketDataSubscriptionCostResponse({
	errorText,
	monthlyCost
}) {
	return arguments[0];
}
export function SecondMarketDataSubscriptionResponse({
	errorText,
	errorCode,
	secondMarketDataSubscription
}) {
	return arguments[0];
}
export function SignUpOrganizationMember({
	name,
	email,
	password,
	firstName,
	lastName
}) {
	return arguments[0];
}
export function SignUpResponse({
	errorText,
	errorCode,
	userId,
	emailVerified
}) {
	return arguments[0];
}
export function SimpleResponse({
	errorText,
	ok
}) {
	return arguments[0];
}
export function SpreadDefinition({
	id,
	timestamp,
	spreadType,
	uds
}) {
	return arguments[0];
}
export function StartOrderStrategy({
	accountId,
	accountSpec,
	symbol,
	orderStrategyTypeId,
	action,
	params,
	uuid,
	customTag50
}) {
	return arguments[0];
}
export function SyncMessage({
	users,
	accounts,
	accountRiskStatuses,
	marginSnapshots,
	userAccountAutoLiqs,
	cashBalances,
	currencies,
	positions,
	fillPairs,
	orders,
	contracts,
	contractMaturities,
	products,
	exchanges,
	spreadDefinitions,
	commands,
	commandReports,
	executionReports,
	orderVersions,
	fills,
	orderStrategies,
	orderStrategyLinks,
	userProperties,
	properties,
	userPlugins,
	contractGroups,
	orderStrategyTypes
}) {
	return arguments[0];
}
export function SyncRequest({
	users,
	accounts,
	splitResponses
}) {
	return arguments[0];
}
export function TakeAlertSignalOwnership({
	adminAlertSignalId
}) {
	return arguments[0];
}
export function TradingPermission({
	id,
	userId,
	accountId,
	accountHolderContact,
	accountHolderEmail,
	ctaContact,
	ctaEmail,
	status,
	updated,
	approvedById
}) {
	return arguments[0];
}
export function TradingPermissionResponse({
	errorText,
	tradingPermission
}) {
	return arguments[0];
}
export function TradingPermissionsResponse({
	tradingPermissions
}) {
	return arguments[0];
}
export function TradovateSubscription({
	id,
	userId,
	timestamp,
	planPrice,
	creditCardTransactionId,
	cashBalanceLogId,
	creditCardId,
	accountId,
	tradovateSubscriptionPlanId,
	startDate,
	expirationDate,
	paidAmount,
	cancelledRenewal,
	cancelReason
}) {
	return arguments[0];
}
export function TradovateSubscriptionPlan({
	id,
	name,
	title,
	price,
	startDate,
	discontinuedDate,
	category,
	trial,
	duration,
	durationUnits,
	riskCategoryId,
	multipleAccounts,
	organizationId,
	replaySessions,
	footnote,
	simOnly
}) {
	return arguments[0];
}
export function TradovateSubscriptionResponse({
	errorText,
	errorCode,
	tradovateSubscription
}) {
	return arguments[0];
}
export function User({
	id,
	name,
	timestamp,
	email,
	status,
	professional,
	organizationId,
	linkedUserId,
	foreignIntroducingBrokerId
}) {
	return arguments[0];
}
export function UserAccountAutoLiq({
	id,
	changesLocked,
	marginPercentageAlert,
	dailyLossPercentageAlert,
	dailyLossAlert,
	marginPercentageLiqOnly,
	dailyLossPercentageLiqOnly,
	dailyLossLiqOnly,
	marginPercentageAutoLiq,
	dailyLossPercentageAutoLiq,
	dailyLossAutoLiq,
	weeklyLossAutoLiq,
	flattenTimestamp,
	trailingMaxDrawdown,
	trailingMaxDrawdownLimit,
	dailyProfitAutoLiq,
	weeklyProfitAutoLiq
}) {
	return arguments[0];
}
export function UserAccountPositionLimit({
	id,
	contractId,
	productId,
	exchangeId,
	productType,
	riskDiscountContractGroupId,
	productVerificationStatus,
	contractGroupId,
	active,
	riskTimePeriodId,
	totalBy,
	shortLimit,
	longLimit,
	exposedLimit,
	description,
	accountId
}) {
	return arguments[0];
}
export function UserAccountRiskParameter({
	id,
	contractId,
	productId,
	exchangeId,
	productType,
	riskDiscountContractGroupId,
	productVerificationStatus,
	contractGroupId,
	maxOpeningOrderQty,
	maxClosingOrderQty,
	maxBackMonth,
	preExpirationDays,
	marginPercentage,
	marginDollarValue,
	hardLimit,
	userAccountPositionLimitId
}) {
	return arguments[0];
}
export function UserPlugin({
	id,
	userId,
	timestamp,
	planPrice,
	creditCardTransactionId,
	cashBalanceLogId,
	creditCardId,
	accountId,
	pluginName,
	approval,
	entitlementId,
	startDate,
	expirationDate,
	paidAmount,
	autorenewal,
	planCategories
}) {
	return arguments[0];
}
export function UserProperty({
	id,
	userId,
	propertyId,
	value
}) {
	return arguments[0];
}
export function UserSession({
	id,
	userId,
	startTime,
	endTime,
	ipAddress,
	appId,
	appVersion,
	clientAppId
}) {
	return arguments[0];
}
export function UserSessionStats({
	id,
	lastSessionTime,
	failedPasswords
}) {
	return arguments[0];
}
export function UserStatusMessage({
	errorText,
	status
}) {
	return arguments[0];
}
