/**
 * API Enumerated Variables
 */

const URLs = {

    // DEMO URLs
    d: {
        url: 'https://demo.tradovateapi.com/v1',
	    wss: 'wss://demo.tradovateapi.com/v1/websocket',
	    mds: 'wss://md-demo.tradovateapi.com/v1/websocket'
    },

	// LIVE URLs
    l: {
        url: 'https://live.tradovateapi.com/v1',
	    wss: 'wss://live.tradovateapi.com/v1/websocket',
	    mds: 'wss://md.tradovateapi.com/v1/websocket'
    },

	// REPLAY URLs
    r: {
	    url: 'https://replay.tradovateapi.com/v1',
	    wss: 'wss://replay.tradovateapi.com/v1/websocket',
	    mds: 'wss://replay.tradovateapi.com/v1/websocket'
    }

}

const ChartType = {
	MinuteBar: 'MinuteBar',
	Tick: 'Tick',
	DailyBar: 'DailyBar',
	Custom: 'Custom',
	DOM: 'DOM'
}
 
const ChartUnits = {
	Volume: 'Volume',
	Range: 'Range',
	UnderlyingUnits: 'UnderlyingUnits',
	Renko: 'Renko',
	MomentumRange: 'MomentumRange',
	PointAndFigure: 'PointAndFigure',
	OFARange: 'OFARange',
	Seconds: 'Seconds'
}
 
const OrderAction = {
	Buy: 'Buy',
	Sell: 'Sell'
}

const OrderType = {
	Limit: 'Limit',
	MIT: 'MIT',
	Market: 'Market',
	QTS: 'QTS',
	Stop: 'Stop',
	StopLimit: 'StopLimit',
	TrailingStop: 'TrailingStop',
	TrailingStopLimit: 'TrailingStopLimit'
}

const CommandStatus = {
	AtExecution: 1,
	ExecutionRejected: 2,
	ExecutionStopped: 3,
	ExecutionSuspended: 4,
	OnHold: 5,
	Pending: 6,
	PendingExecution: 7,
	Replaced: 8,
	RiskPassed: 9,
	RiskRejected: 10        
}

const ExecType = {
	Canceled: 1,
	Completed: 2,
	DoneForDay: 3,
	Expired: 4,
	New: 5,
	OrderStatus: 6,
	PendingCancel: 7,
	PendingNew: 8,
	PendingReplace: 9,
	Rejected: 10,
	Replaced: 11,
	Stopped: 12,
	Suspended: 13,
	Trade: 14,
	TradeCancel: 15,
	TradeCorrect: 16  			   
}

const OrdStatus = {
	Canceled: 'Canceled',
	Completed: 'Completed',
	Expired: 'Expired',
	Filled: 'Filled',
	PendingCancel: 'PendingCancel',
	PendingNew: 'PendingNew',
	PendingReplace: 'PendingReplace',
	Rejected: 'Rejected',
	Suspended: 'Suspended',			// Pending / Waiting to submit due to bracket
	Unknown: 'Unknown',
	Working: 'Working'
}

const RejectReason = {
	AccountClosed: 1,
	AdvancedTrailingStopUnsupported: 2,
	AnotherCommandPending: 3,
	BackMonthProhibited: 4,
	ExecutionProviderNotConfigured: 5,
	ExecutionProviderUnavailable: 6,
	InvalidContract: 7,
	InvalidPrice: 8,
	LiquidationOnly: 9,
	LiquidationOnlyBeforeExpiration: 10,
	MaxOrderQtyIsNotSpecified: 11,
	MaxOrderQtyLimitReached: 12,
	MaxPosLimitMisconfigured: 13,
	MaxPosLimitReached: 14,
	MaxTotalPosLimitReached: 15,
	MultipleAccountPlanRequired: 16,
	NoQuote: 17,
	NotEnoughLiquidity: 18,
	OtherExecutionRelated: 19,
	ParentRejected: 20,
	RiskCheckTimeout: 21,
	SessionClosed: 22,
	Success: 23,
	TooLate: 24,
	TradingLocked: 25,
	TrailingStopNonOrderQtyModify: 26,
	Unauthorized: 27,
	UnknownReason: 28,
	Unsupported: 29    
}

const WorkingOrder = {
	PendingCancel: 'PendingCancel',
	PendingNew: 'PendingNew',
	PendingReplace: 'PendingReplace',
	Working: 'Working',
	Suspended: 'Suspended',
}

const NoOrder = {
	Canceled: 'Canceled',
	Completed: 'Completed',
	Expired: 'Expired',
	Filled: 'Filled',
	Rejected: 'Rejected',
	Unknown: 'Unknown',
}


const TdMessage = {
    Chart: 'charts',
    DOM: 'doms',
    Histogram: 'histograms',
    Quote: 'quotes',
    UserSync: 'usersync',
    Props: 'props'
}

const TdEvent = {
    usersync: 'usersync',
    props: 'props',
}

const TdData = {
    charts: 'charts',
    doms: 'doms',
    histograms: 'histograms',
    quotes: 'quotes'
}

const TdSyncProps = {
	// userReadStatuses,
	
	// Non-Synced Props
	md: "md",
    auth: "auth",
    currencyRate: "currencyRate",
    productSession: "productSession",
    fillFee: "fillFee",
    cashBalanceLog: "cashBalanceLog",
    tradingPermission: "tradingPermission",
    contractMargin: "contractMargin",
    productMargin: "productMargin",
    userAccountPositionLimit: "userAccountPositionLimit",
    userAccountRiskParameter: "userAccountRiskParameter",
    marketDataSubscriptionExchangeScope: "marketDataSubscriptionExchangeScope",
    marketDataSubscriptionPlan: "marketDataSubscriptionPlan",
    tradovateSubscriptionPlan: "tradovateSubscriptionPlan",
    adminAlertSignal: "adminAlertSignal",
    alert: "alert",
    alertSignal: "alertSignal",
    adminAlert: "adminAlert",
    clearingHouse: "clearingHouse",
    entitlement: "entitlement",
    contactInfo: "contactInfo",
    marketDataSubscription: "marketDataSubscription",
    organization: "organization",
    secondMarketDataSubscription: "secondMarketDataSubscription",
    tradovateSubscription: "tradovateSubscription",
    userSession: "userSession",
    chat: "chat",
    chatMessage: "chatMessage",

	// Synced Props
    contract: "contracts",
    contractGroup: "contractGroups",
    contractMaturity: "contractMaturities",
    currency: "currencies",
    exchange: "exchanges",
    product: "products",
    spreadDefinition: "spreadDefinitions",
    command: "commands",
    commandReport: "commandReports",
    executionReport: "executionReports",
    fill: "fills",
    order: "orders",
    orderStrategy: "orderStrategies",
    orderStrategyLink: "orderStrategyLinks",
    orderVersion: "orderVersions",
    fillPair: "fillPairs",
    position: "positions",
    account: "accounts",
    cashBalance: "cashBalances",
    marginSnapshot: "marginSnapshots",
    accountRiskStatus: "accountRiskStatuses",
    userAccountAutoLiq: "userAccountAutoLiqs",
    orderStrategyType: "orderStrategyTypes",
    property: "properties",
    user: "users",
    userPlugin: "userPlugins",
    userProperty: "userProperties",
    userSessionStats: "userSessionStats",
    
}

const TdProps = {
    md: "md",
    auth: "auth",
    contract: "contract",
    contractGroup: "contractGroup",
    contractMaturity: "contractMaturity",
    currency: "currency",
    currencyRate: "currencyRate",
    exchange: "exchange",
    product: "product",
    productSession: "productSession",
    spreadDefinition: "spreadDefinition",
    command: "command",
    commandReport: "commandReport",
    executionReport: "executionReport",
    fill: "fill",
    fillFee: "fillFee",
    order: "order",
    orderStrategy: "orderStrategy",
    orderStrategyLink: "orderStrategyLink",
    orderVersion: "orderVersion",
    fillPair: "fillPair",
    position: "position",
    account: "account",
    cashBalance: "cashBalance",
    cashBalanceLog: "cashBalanceLog",
    marginSnapshot: "marginSnapshot",
    tradingPermission: "tradingPermission",
    accountRiskStatus: "accountRiskStatus",
    contractMargin: "contractMargin",
    productMargin: "productMargin",
    userAccountAutoLiq: "userAccountAutoLiq",
    userAccountPositionLimit: "userAccountPositionLimit",
    userAccountRiskParameter: "userAccountRiskParameter",
    marketDataSubscriptionExchangeScope: "marketDataSubscriptionExchangeScope",
    marketDataSubscriptionPlan: "marketDataSubscriptionPlan",
    tradovateSubscriptionPlan: "tradovateSubscriptionPlan",
    adminAlertSignal: "adminAlertSignal",
    alert: "alert",
    alertSignal: "alertSignal",
    adminAlert: "adminAlert",
    clearingHouse: "clearingHouse",
    entitlement: "entitlement",
    orderStrategyType: "orderStrategyType",
    property: "property",
    contactInfo: "contactInfo",
    marketDataSubscription: "marketDataSubscription",
    organization: "organization",
    secondMarketDataSubscription: "secondMarketDataSubscription",
    tradovateSubscription: "tradovateSubscription",
    user: "user",
    userPlugin: "userPlugin",
    userProperty: "userProperty",
    userSession: "userSession",
    userSessionStats: "userSessionStats",
    chat: "chat",
    chatMessage: "chatMessage"
}

module.exports = {
    URLs,
	ChartType,
	ChartUnits,
	OrderAction,
	OrderType,
	CommandStatus,
	ExecType,
	OrdStatus,
	RejectReason,
	WorkingOrder,
	NoOrder,
	TdMessage,
	TdEvent,
	TdData,
	TdSyncProps,
	TdProps
}

// export const 
	
//  ChartType = {
// 	 MinuteBar: 'MinuteBar',
// 	 Tick: 'Tick',
// 	 DailyBar: 'DailyBar',
// 	 Custom: 'Custom',
// 	 DOM: 'DOM'
//  },
 
//  ChartUnits = {
// 	 Volume: 'Volume',
// 	 Range: 'Range',
// 	 UnderlyingUnits: 'UnderlyingUnits',
// 	 Renko: 'Renko',
// 	 MomentumRange: 'MomentumRange',
// 	 PointAndFigure: 'PointAndFigure',
// 	 OFARange: 'OFARange',
// 	 Seconds: 'Seconds'
//  },
 
//  OrderAction = {
// 	 Buy: 'Buy',
// 	 Sell: 'Sell'
//  },

//  OrderType = {
// 	 Limit: 'Limit',
// 	 MIT: 'MIT',
// 	 Market: 'Market',
// 	 QTS: 'QTS',
// 	 Stop: 'Stop',
// 	 StopLimit: 'StopLimit',
// 	 TrailingStop: 'TrailingStop',
// 	 TrailingStopLimit: 'TrailingStopLimit'
//  },

//  CommandStatus = {
// 	 AtExecution: 1,
// 	 ExecutionRejected: 2,
// 	 ExecutionStopped: 3,
// 	 ExecutionSuspended: 4,
// 	 OnHold: 5,
// 	 Pending: 6,
// 	 PendingExecution: 7,
// 	 Replaced: 8,
// 	 RiskPassed: 9,
// 	 RiskRejected: 10        
//  },

//  ExecType = {
// 	 Canceled: 1,
// 	 Completed: 2,
// 	 DoneForDay: 3,
// 	 Expired: 4,
// 	 New: 5,
// 	 OrderStatus: 6,
// 	 PendingCancel: 7,
// 	 PendingNew: 8,
// 	 PendingReplace: 9,
// 	 Rejected: 10,
// 	 Replaced: 11,
// 	 Stopped: 12,
// 	 Suspended: 13,
// 	 Trade: 14,
// 	 TradeCancel: 15,
// 	 TradeCorrect: 16  			   
//  },

//  OrdStatus = {
// 	 Canceled: 'Canceled',
// 	 Completed: 'Completed',
// 	 Expired: 'Expired',
// 	 Filled: 'Filled',
// 	 PendingCancel: 'PendingCancel',
// 	 PendingNew: 'PendingNew',
// 	 PendingReplace: 'PendingReplace',
// 	 Rejected: 'Rejected',
// 	 Suspended: 'Suspended',			// Pending / Waiting to submit due to bracket
// 	 Unknown: 'Unknown',
// 	 Working: 'Working'
//  },

//  RejectReason = {
// 	 AccountClosed: 1,
// 	 AdvancedTrailingStopUnsupported: 2,
// 	 AnotherCommandPending: 3,
// 	 BackMonthProhibited: 4,
// 	 ExecutionProviderNotConfigured: 5,
// 	 ExecutionProviderUnavailable: 6,
// 	 InvalidContract: 7,
// 	 InvalidPrice: 8,
// 	 LiquidationOnly: 9,
// 	 LiquidationOnlyBeforeExpiration: 10,
// 	 MaxOrderQtyIsNotSpecified: 11,
// 	 MaxOrderQtyLimitReached: 12,
// 	 MaxPosLimitMisconfigured: 13,
// 	 MaxPosLimitReached: 14,
// 	 MaxTotalPosLimitReached: 15,
// 	 MultipleAccountPlanRequired: 16,
// 	 NoQuote: 17,
// 	 NotEnoughLiquidity: 18,
// 	 OtherExecutionRelated: 19,
// 	 ParentRejected: 20,
// 	 RiskCheckTimeout: 21,
// 	 SessionClosed: 22,
// 	 Success: 23,
// 	 TooLate: 24,
// 	 TradingLocked: 25,
// 	 TrailingStopNonOrderQtyModify: 26,
// 	 Unauthorized: 27,
// 	 UnknownReason: 28,
// 	 Unsupported: 29    
//  },

//  WorkingOrder = {
// 	 PendingCancel: 'PendingCancel',
// 	 PendingNew: 'PendingNew',
// 	 PendingReplace: 'PendingReplace',
// 	 Working: 'Working',
// 	 Suspended: 'Suspended',
//  },

//   NoOrder = {
// 	 Canceled: 'Canceled',
// 	 Completed: 'Completed',
// 	 Expired: 'Expired',
// 	 Filled: 'Filled',
// 	 Rejected: 'Rejected',
// 	 Unknown: 'Unknown',
//  }



// export const TdMessage = {
//     Chart: 'charts',
//     DOM: 'doms',
//     Histogram: 'histograms',
//     Quote: 'quotes',
//     UserSync: 'usersync',
//     Props: 'props'
// }

// export const TdEvent = {
//     usersync: 'usersync',
//     props: 'props',
// }

// export const TdData = {
//     charts: 'charts',
//     doms: 'doms',
//     histograms: 'histograms',
//     quotes: 'quotes'
// }

// export const TdSyncProps = {
// 	// userReadStatuses,
	
// 	// Non-Synced Props
// 	md: "md",
//     auth: "auth",
//     currencyRate: "currencyRate",
//     productSession: "productSession",
//     fillFee: "fillFee",
//     cashBalanceLog: "cashBalanceLog",
//     tradingPermission: "tradingPermission",
//     contractMargin: "contractMargin",
//     productMargin: "productMargin",
//     userAccountPositionLimit: "userAccountPositionLimit",
//     userAccountRiskParameter: "userAccountRiskParameter",
//     marketDataSubscriptionExchangeScope: "marketDataSubscriptionExchangeScope",
//     marketDataSubscriptionPlan: "marketDataSubscriptionPlan",
//     tradovateSubscriptionPlan: "tradovateSubscriptionPlan",
//     adminAlertSignal: "adminAlertSignal",
//     alert: "alert",
//     alertSignal: "alertSignal",
//     adminAlert: "adminAlert",
//     clearingHouse: "clearingHouse",
//     entitlement: "entitlement",
//     contactInfo: "contactInfo",
//     marketDataSubscription: "marketDataSubscription",
//     organization: "organization",
//     secondMarketDataSubscription: "secondMarketDataSubscription",
//     tradovateSubscription: "tradovateSubscription",
//     userSession: "userSession",
//     chat: "chat",
//     chatMessage: "chatMessage",

// 	// Synced Props
//     contract: "contracts",
//     contractGroup: "contractGroups",
//     contractMaturity: "contractMaturities",
//     currency: "currencies",
//     exchange: "exchanges",
//     product: "products",
//     spreadDefinition: "spreadDefinitions",
//     command: "commands",
//     commandReport: "commandReports",
//     executionReport: "executionReports",
//     fill: "fills",
//     order: "orders",
//     orderStrategy: "orderStrategies",
//     orderStrategyLink: "orderStrategyLinks",
//     orderVersion: "orderVersions",
//     fillPair: "fillPairs",
//     position: "positions",
//     account: "accounts",
//     cashBalance: "cashBalances",
//     marginSnapshot: "marginSnapshots",
//     accountRiskStatus: "accountRiskStatuses",
//     userAccountAutoLiq: "userAccountAutoLiqs",
//     orderStrategyType: "orderStrategyTypes",
//     property: "properties",
//     user: "users",
//     userPlugin: "userPlugins",
//     userProperty: "userProperties",
//     userSessionStats: "userSessionStats",
    
// }

// export const TdProps = {
//     md: "md",
//     auth: "auth",
//     contract: "contract",
//     contractGroup: "contractGroup",
//     contractMaturity: "contractMaturity",
//     currency: "currency",
//     currencyRate: "currencyRate",
//     exchange: "exchange",
//     product: "product",
//     productSession: "productSession",
//     spreadDefinition: "spreadDefinition",
//     command: "command",
//     commandReport: "commandReport",
//     executionReport: "executionReport",
//     fill: "fill",
//     fillFee: "fillFee",
//     order: "order",
//     orderStrategy: "orderStrategy",
//     orderStrategyLink: "orderStrategyLink",
//     orderVersion: "orderVersion",
//     fillPair: "fillPair",
//     position: "position",
//     account: "account",
//     cashBalance: "cashBalance",
//     cashBalanceLog: "cashBalanceLog",
//     marginSnapshot: "marginSnapshot",
//     tradingPermission: "tradingPermission",
//     accountRiskStatus: "accountRiskStatus",
//     contractMargin: "contractMargin",
//     productMargin: "productMargin",
//     userAccountAutoLiq: "userAccountAutoLiq",
//     userAccountPositionLimit: "userAccountPositionLimit",
//     userAccountRiskParameter: "userAccountRiskParameter",
//     marketDataSubscriptionExchangeScope: "marketDataSubscriptionExchangeScope",
//     marketDataSubscriptionPlan: "marketDataSubscriptionPlan",
//     tradovateSubscriptionPlan: "tradovateSubscriptionPlan",
//     adminAlertSignal: "adminAlertSignal",
//     alert: "alert",
//     alertSignal: "alertSignal",
//     adminAlert: "adminAlert",
//     clearingHouse: "clearingHouse",
//     entitlement: "entitlement",
//     orderStrategyType: "orderStrategyType",
//     property: "property",
//     contactInfo: "contactInfo",
//     marketDataSubscription: "marketDataSubscription",
//     organization: "organization",
//     secondMarketDataSubscription: "secondMarketDataSubscription",
//     tradovateSubscription: "tradovateSubscription",
//     user: "user",
//     userPlugin: "userPlugin",
//     userProperty: "userProperty",
//     userSession: "userSession",
//     userSessionStats: "userSessionStats",
//     chat: "chat",
//     chatMessage: "chatMessage"
// }