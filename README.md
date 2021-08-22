# Market Maker

Simple, elegant market maker with buy-and-hold mindset

[Markdown+Math](https://marketplace.visualstudio.com/items?itemName=goessner.mdmath)


## Strategy

The strategy exploits the intrinsic melt-up of the market.
* Exclusively long, no shorting
* Limit entries at dynamic entry points below the current bid, based on order flow and volume signals
* Only selling for a profit for optimal entries
* Suboptimal entries which are not quickly profitable are treated as buy-and-hold
* Entries that do not reach profitability will be held until contract expiry for a realized P&L

## Risk Aversion

The strategy consolidates multiple metrics of risk aversion, in unitless values, to come up with a somewhat deterministic parameter for risk aversion to be used for setting entries and exits.

* Intraday Trading Hours Risk
* Order Flow Risk
* Liquidity Risk
* Volatility Risk


### Intraday Trading Hours Risk

In an ideal world, the strategy aims to trade entirely intraday, profiting off of the volatility with the assurance that poorly timed bets will eventually be profitable converting into a buy-and-hold position. In order to choose optimal ***entries*** intraday, we need to take into account a measure of the uncertainty about the markets given the time of day. The uncertainty could be likened to volatility, *due to the lack of available information, liquidity, or historical volatility*.

On one hand, the intraday uncertainty is high in the morning before significant volume has exchanged hands and price discovery is nascent. As the day progresses, and liquidity stabilizes and the volume profile expands, price discovery is progressively more complete. However, though liquidity and spreads, and in some cases volatility, may be higher going into the close, in general, by the end of the day, the price discovery is nearly complete.

We can use this to create two models for intraday risk aversion, where $\Tau = \mathrm{Trading\ Hours\ per\ Session}$. The quadratic smile constrains $ T(0) = 1, T(\frac{\Tau}{2}) = \frac{1}{2}, T(\Tau) = 1$, the exponential smile constrains $ T(0) = 1, T(\Tau) = \frac{1}{2}$. 

#### Quadratic Smile

Solved per [Wolfram Alpha](https://www.wolframalpha.com/input/?i=systems+of+equations+calculator&assumption=%7B%22F%22%2C+%22SolveSystemOf3EquationsCalculator%22%2C+%22equation1%22%7D+-%3E%221+%3D+a+%28+e+%5E+%280+-+0.5%29+%2B+e+%5E+%28+-+%28+0+-+0.5+%29+%29+%29+%2B+b%22&assumption=%22FSelect%22+-%3E+%7B%7B%22SolveSystemOf3EquationsCalculator%22%7D%7D&assumption=%7B%22F%22%2C+%22SolveSystemOf3EquationsCalculator%22%2C+%22equation2%22%7D+-%3E%221+%3D+a+%28+e+%5E+%281+-+0.5%29+%2B+e+%5E+%28+-+%28+1+-+0.5+%29+%29+%29+%2B+b%22&assumption=%7B%22F%22%2C+%22SolveSystemOf3EquationsCalculator%22%2C+%22equation3%22%7D+-%3E%220.5+%3D+a+%28+e+%5E+%280.5+-+0.5%29+%2B+e+%5E+%28+-+%28+0.5+-+0.5+%29+%29+%29+%2B+b%22)


$$ T = \begin{matrix} 
\mathrm{Quadratic\ Form} & a(t-b)^2 + c & = & 2(t/\Tau-\frac{1}{2})^2 + \frac{1}{2} \\ 
\mathrm{Exponential\ Form} & a(e^{k_1(t-b)} + e^{-k_2 (t-c)}) + d & = & 1.95885(e^{(t - \Tau/2)} + e^{-(t - \Tau/2)}) - 3.4177 \\
\end{matrix} $$

#### Exponential Decay

$$ T = e^{-ax} = e^{-\mathrm{ln}(2)\times(t - t_0)\div \Tau}$$

### Order Flow Risk

Order flow (namely, market orders) contains information that has market impact and the immediate risk of moving price. The Hawkes Process sums the time-decayed market impact of orders observed in the recent interval. To compare orders, we take the difference between bid (selling, negative) Hawkes intensity and ask (buying, positive) Hawkes intensity. We normalize with the average session volume per unit of Hawkes time (e.g., per minute). This essentially tells us the `impactedVolume` per `unitVolume`, or in other words, `impact` per `unit`, i.e., relative intensity. We raise it to a natural exponent to get a strictly positive value in `(0, +inf)`. The idea is greater buying (ask) pressure leads to a negative exponent and a value `0 < H < 1`, which reduces risk aversion in an uptrend (in order to capture some of the potential uptrend rather than leaving the entry target too far below the trend, thus rendering it unable to be revisited). On the other hand, greater selling (bid) pressure leads to a positive exponent which and a value `1 < H < +inf`, which aggressively increases risk aversion as a potential downtrend begins.


![Hawkes Process](https://hawkeslib.readthedocs.io/en/latest/_images/output_19_0.png)

$$ h_{a,b} = \sum_{\tau} v_{a,b,i} e^{-k(t_i/\tau)} $$ 
$$ \mathrm{Hawkes} = (h_b-h_a)/V_{\tau} $$
$$ H = \mathrm{Max}(1,\mathrm{ln}(\mathrm{Hawkes} + 1) + 1)$$

## Liquidity Risk

The market is in a constant state of price discovery, but as price is discovered, it is constantly hedged and de-hedged, which tends to add gravitas to price levels and value areas of higher volume. As the price moves, a bell curve of sorts is painted in the volume profile. By extracting an estimate of $\sigma$ from the volume profile, we can determine whether we are in a value area or in a tail on the basis of the $Z$-score.  Price that is near the value area, i.e., `Z < 1`, should theoretically be more stable (unless new information is observed which moves the value area, such as a major influx of market orders that begin a trend). As such, we have more risk appetite in the value zone. Price near the tails indicates we are outside of the value area, and thus have less hedging activity and volume to indicate that liquidity exists firmly. As a result, we expect more volatility, so we should increase our risk aversion. However, we do not want to overdo the risk aversion, because by the time we are at a e.g. `Z = 4` $\sigma$ zone, odds are we are here to stay (the market is more likely to trend from `Z = 0` to `Z = 4` and then build new value which decays the `Z --> 1` in the new zone, than it is to, say, gain 2% then close down 3%). As such, we use a natural logarithm to sub-linearize the $z$-score impact to risk aversion, and ensure it is strictly positive by shifting it 1 to intersect with 0.

Further, we take the skewness of the histogram ($s$) as a sort of correction factor. Though not statistically valid, because $s^{1/3}$ has units of $z$, we can apply a correction factor to get a more reasonable bias based on liquidity.

$$ \sigma_{standard} = \mathrm{StDev}(\mathrm{Price}, \mathrm{Volume})_{histogram} $$


$$ \sigma_{FWHM} = (FWHM)_{histogram} / 2.36 $$

$$ \sigma_{estimated} = (\sigma_{standard} + \sigma_{FWHM} ) / 2 $$

$$ z = \frac{x - \mu}{\sigma} $$

$$ s = \mathrm{Skew}(\mathrm{Price}, \mathrm{Volume})_{histogram} $$
$$ s_{corrected} = s^{1/3} $$

$$ z_{corrected} = z - s_{corrected} $$

$$ Z = \mathrm{Max}(1,\mathrm{ln}(z_{corrected} + 1) + 1)$$

## Volatility Risk

There's not really ever a good way to estimate volatility, and without a complicated peak finding algorithm or structural break test, we can't really determine how long a run-up has been going for and when it's about to change course. The simplest approach is to take a time-based volatility in terms of standard deviation of bar prices. This adds a final layer of conservatism.

$$ \mathrm{Volatility} \approx \mathrm{StDev}(\mathrm{Bars}_{30min})$$
$$ V = \mathrm{Max}(1,\mathrm{ln}(\mathrm{Volatility + 1 }) + 1)$$

## Bringing it all together

We superposition the `Z`-factor and the `H`-factor to balance the impact of anticipated liquidity / uncertainty with the immediate risk of new, fresh volatility. Then, we linearly scale the result by our trading session smile, the `S`-factor to ensure we are appropriately evaluating risk based on the variable liquidity and volatility throughout the day.

$$ \lambda = T \times Z \times H \times V $$

The $\lambda$ is simply the scalp we think we can get. Finally, we need to specify, relative to the current bid and ask, what our entry price and exit price targets are. Rather than naively expecting the market to dip towards our scalp, and we perfectly capture the upswing for our scalp target, we should bias based on the trend of the day. If the market is dipping or trending down, we want to bias a lower entry target, and respectively set the exit target closer to the current ask (or even below it!). If the market is trending up, we want to bias the entry target closer to the current bid (or even above it!) and bias the exit target further above the current ask. To do this, we can implement a ***heuristic***. Since the market ***typically*** sees `| returns | <= 1%`, we can use an adapted sigmoid to get a bias factor with the percent returns of the market's move so far today. Our shape factor $k$ should be `k >= 1`, notably adaptive. We'll take the adaptive nature to be the absolute ratio of absolute returns to relative returns (the returns relative to the average price of the day, which should almost always be `r <= a` except in weird markets where price runs up (or down), builds value, and then quickly shifts towards the opposite direction (thus placing `averagePrice > openingPrice` when `r < 0, a < 0`, or `averagePrice < openingPrice` when `r > 0, a > 0`). In the edge case, we constrain `k >= 1`.

$$ \beta = \frac{1}{1+e^{-kx}} = \frac{1}{1+e^{-(\mathrm{Min}(\mathrm{Abs}(a/r), 1) \times a)}} $$

$$ \mathrm{Entry} = \mathrm{Bid} - \lambda \times \beta $$
$$ \mathrm{Exit} = \mathrm{Ask} + \lambda \times (1 - \beta) $$

## Ensure No Premature Cancellations

Because we want orders to be evergreen, we will constantly update them if not filled. However, we might be prematurely cancelling an order that is optimal and ready to be filled. In this case, we check that our limit entry order is less than the current $\lambda$ away from the bid. This won't perfectly solve all edge cases (much less risky scenarios where the market dynamics change quickly, thus $\lambda_{updated}$ could dwarf the remaining historical $\lambda_{historical}$). However, it does give us a better chance of having safe entries get filled rather than prematurely rebased further from the current bid.

$$ \mathrm{Overwrite} = \mathrm{Abs}(\mathrm{Bid} - \mathrm{Entry}) \gt \lambda_{updated}$$