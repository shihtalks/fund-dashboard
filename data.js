const FUND_DATA = {
  "indices": [
    {
      "code": "000001",
      "name": "上证指数",
      "price": 4182.59,
      "change_pct": 0.47,
      "change_amt": 19.71,
      "volume": 1345892469395.2,
      "high": 4188.77,
      "low": 4131.37,
      "open": 4151.8,
      "prev_close": 4162.88,
      "amplitude": 1.38
    },
    {
      "code": "399001",
      "name": "深证成指",
      "price": 14465.79,
      "change_pct": -0.2,
      "change_amt": -29.3,
      "volume": 1674826283498.0332,
      "high": 14509.69,
      "low": 14285.67,
      "open": 14327.65,
      "prev_close": 14495.09,
      "amplitude": 1.55
    },
    {
      "code": "399006",
      "name": "创业板指",
      "price": 3294.16,
      "change_pct": -0.49,
      "change_amt": -16.14,
      "volume": 743719423714.45,
      "high": 3319.91,
      "low": 3257.05,
      "open": 3257.05,
      "prev_close": 3310.3,
      "amplitude": 1.9
    },
    {
      "code": "000300",
      "name": "沪深300",
      "price": 4728.67,
      "change_pct": 0.38,
      "change_amt": 18.02,
      "volume": 752681937770.4,
      "high": 4735.41,
      "low": 4667.28,
      "open": 4681.01,
      "prev_close": 4710.65,
      "amplitude": 1.45
    },
    {
      "code": "000688",
      "name": "科创50",
      "price": 1464.77,
      "change_pct": -1.56,
      "change_amt": -23.25,
      "volume": 79348051009.0,
      "high": 1486.55,
      "low": 1459.51,
      "open": 1459.78,
      "prev_close": 1488.02,
      "amplitude": 1.82
    },
    {
      "code": "000016",
      "name": "上证50",
      "price": 3046.47,
      "change_pct": 0.23,
      "change_amt": 7.04,
      "volume": 193821718736.0,
      "high": 3050.92,
      "low": 3010.05,
      "open": 3031.45,
      "prev_close": 3039.43,
      "amplitude": 1.34
    },
    {
      "code": "899050",
      "name": "北证50",
      "price": 1475.73,
      "change_pct": -3.99,
      "change_amt": -61.4,
      "volume": 25503289586.0,
      "high": 1507.69,
      "low": 1468.27,
      "open": 1506.68,
      "prev_close": 1537.13,
      "amplitude": 2.56
    }
  ],
  "industry_boards": [
    {
      "name": "农林牧渔",
      "change_pct": -1.28,
      "main_flow": -3928592437.55
    },
    {
      "name": "基础化工",
      "change_pct": -0.91,
      "main_flow": -1618090116.7
    },
    {
      "name": "钢铁",
      "change_pct": -1.56,
      "main_flow": -1059218327.82
    },
    {
      "name": "有色金属",
      "change_pct": -0.37,
      "main_flow": -1254143009.61
    },
    {
      "name": "电子",
      "change_pct": -0.99,
      "main_flow": -3742527777.34
    },
    {
      "name": "汽车",
      "change_pct": 0.76,
      "main_flow": 958748870.55
    },
    {
      "name": "家用电器",
      "change_pct": 1.1,
      "main_flow": 1208088978.71
    },
    {
      "name": "食品饮料",
      "change_pct": 0.73,
      "main_flow": 1107018234.03
    },
    {
      "name": "纺织服装",
      "change_pct": -1.41,
      "main_flow": -783246782.38
    },
    {
      "name": "轻工制造",
      "change_pct": -0.89,
      "main_flow": -553477453.73
    },
    {
      "name": "医药生物",
      "change_pct": -0.83,
      "main_flow": -3052289018.57
    },
    {
      "name": "公用事业",
      "change_pct": 0.2,
      "main_flow": 325547988.6
    },
    {
      "name": "交通运输",
      "change_pct": 0.63,
      "main_flow": 248940800.97
    },
    {
      "name": "房地产",
      "change_pct": -2.32,
      "main_flow": -2479684920.89
    },
    {
      "name": "金融",
      "change_pct": 1.64,
      "main_flow": 3862416590.77
    },
    {
      "name": "综合",
      "change_pct": -0.54,
      "main_flow": -423895748.23
    },
    {
      "name": "建筑材料",
      "change_pct": -1.21,
      "main_flow": -886538201.59
    },
    {
      "name": "建筑装饰",
      "change_pct": 0.15,
      "main_flow": 187247123.86
    },
    {
      "name": "电气设备",
      "change_pct": -0.47,
      "main_flow": -1987364521.77
    },
    {
      "name": "机械设备",
      "change_pct": -0.22,
      "main_flow": -748253614.29
    },
    {
      "name": "国防军工",
      "change_pct": -1.33,
      "main_flow": -1823456789.12
    },
    {
      "name": "计算机",
      "change_pct": 1.23,
      "main_flow": 2847362981.45
    },
    {
      "name": "传媒",
      "change_pct": -0.67,
      "main_flow": -934521876.23
    },
    {
      "name": "通信",
      "change_pct": 0.89,
      "main_flow": 1523874569.34
    },
    {
      "name": "煤炭",
      "change_pct": 0.34,
      "main_flow": 456238971.28
    },
    {
      "name": "石油石化",
      "change_pct": 0.56,
      "main_flow": 734521689.45
    },
    {
      "name": "环保",
      "change_pct": -0.78,
      "main_flow": -423156789.56
    },
    {
      "name": "美容护理",
      "change_pct": -1.45,
      "main_flow": -1234567890.12
    },
    {
      "name": "社会服务",
      "change_pct": -0.34,
      "main_flow": -287634521.89
    }
  ],
  "fund_flow": [
    {
      "date": "2026-02-28",
      "main_net": 8234567890.12,
      "super_large_net": 5123456789.23,
      "large_net": 3111111100.89,
      "medium_net": -1234567890.12,
      "small_net": -6999999999.0
    },
    {
      "date": "2026-02-27",
      "main_net": -3456789012.34,
      "super_large_net": -2123456789.45,
      "large_net": -1333332222.89,
      "medium_net": 876543210.12,
      "small_net": 2580245801.22
    },
    {
      "date": "2026-02-26",
      "main_net": 12345678901.23,
      "super_large_net": 7890123456.34,
      "large_net": 4455555444.89,
      "medium_net": -2345678901.23,
      "small_net": -9999999999.0
    },
    {
      "date": "2026-02-25",
      "main_net": -5678901234.56,
      "super_large_net": -3456789012.67,
      "large_net": -2222112221.89,
      "medium_net": 1234567890.12,
      "small_net": 4444333344.44
    },
    {
      "date": "2026-02-24",
      "main_net": 6789012345.67,
      "super_large_net": 4123456789.78,
      "large_net": 2665555555.89,
      "medium_net": -876543210.12,
      "small_net": -5912469135.55
    }
  ],
  "funds": [
    {
      "code": "110011",
      "name": "易方达中小盘混合",
      "type": "混合型",
      "daily_return": 3.82,
      "week_1": 8.45,
      "month_1": 15.23,
      "month_3": 28.67,
      "month_6": 45.12,
      "year_1": 67.89,
      "ytd": 22.34,
      "fee": "1.5%"
    },
    {
      "code": "161725",
      "name": "招商中证白酒指数",
      "type": "指数型",
      "daily_return": 3.45,
      "week_1": 7.23,
      "month_1": 12.56,
      "month_3": 22.34,
      "month_6": 38.67,
      "year_1": 55.12,
      "ytd": 18.90,
      "fee": "0.5%"
    },
    {
      "code": "270042",
      "name": "广发稳健增长混合",
      "type": "混合型",
      "daily_return": 3.21,
      "week_1": 6.78,
      "month_1": 11.23,
      "month_3": 19.45,
      "month_6": 32.56,
      "year_1": 48.23,
      "ytd": 16.78,
      "fee": "1.5%"
    },
    {
      "code": "001410",
      "name": "南方宝元债券",
      "type": "债券型",
      "daily_return": 0.45,
      "week_1": 0.89,
      "month_1": 1.23,
      "month_3": 2.56,
      "month_6": 4.12,
      "year_1": 7.89,
      "ytd": 1.56,
      "fee": "0.8%"
    },
    {
      "code": "000746",
      "name": "博时标普500ETF联接",
      "type": "QDII",
      "daily_return": -1.23,
      "week_1": -2.34,
      "month_1": 3.45,
      "month_3": 8.67,
      "month_6": 15.23,
      "year_1": 28.45,
      "ytd": 5.67,
      "fee": "1.0%"
    },
    {
      "code": "003095",
      "name": "中欧医疗健康混合A",
      "type": "混合型",
      "daily_return": -0.89,
      "week_1": -1.45,
      "month_1": 5.67,
      "month_3": 12.34,
      "month_6": 22.56,
      "year_1": 38.90,
      "ytd": 9.12,
      "fee": "1.5%"
    },
    {
      "code": "519697",
      "name": "交银新生活力灵活配置",
      "type": "混合型",
      "daily_return": 4.56,
      "week_1": 9.12,
      "month_1": 18.34,
      "month_3": 32.56,
      "month_6": 52.78,
      "year_1": 78.90,
      "ytd": 25.67,
      "fee": "1.5%"
    },
    {
      "code": "000961",
      "name": "天弘优选成长混合",
      "type": "混合型",
      "daily_return": 3.78,
      "week_1": 7.89,
      "month_1": 14.23,
      "month_3": 25.67,
      "month_6": 42.34,
      "year_1": 63.45,
      "ytd": 20.89,
      "fee": "1.5%"
    },
    {
      "code": "501057",
      "name": "华夏中证5G通信主题ETF",
      "type": "指数型",
      "daily_return": 2.34,
      "week_1": 5.67,
      "month_1": 9.12,
      "month_3": 16.78,
      "month_6": 28.90,
      "year_1": 45.67,
      "ytd": 13.45,
      "fee": "0.5%"
    },
    {
      "code": "004851",
      "name": "汇添富中证生物科技ETF联接A",
      "type": "指数型",
      "daily_return": 1.89,
      "week_1": 4.23,
      "month_1": 7.56,
      "month_3": 13.89,
      "month_6": 23.45,
      "year_1": 38.12,
      "ytd": 10.78,
      "fee": "0.5%"
    },
    {
      "code": "110020",
      "name": "易方达科讯混合",
      "type": "混合型",
      "daily_return": 5.12,
      "week_1": 10.34,
      "month_1": 20.56,
      "month_3": 36.78,
      "month_6": 58.90,
      "year_1": 85.67,
      "ytd": 28.90,
      "fee": "1.5%"
    },
    {
      "code": "000893",
      "name": "工银瑞信前沿医疗股票",
      "type": "股票型",
      "daily_return": 2.67,
      "week_1": 5.89,
      "month_1": 10.23,
      "month_3": 18.56,
      "month_6": 31.23,
      "year_1": 48.90,
      "ytd": 14.56,
      "fee": "1.5%"
    },
    {
      "code": "260108",\n      "name": "景顺长城内需增长混合",
      "type": "混合型",
      "daily_return": 3.45,
      "week_1": 7.12,
      "month_1": 12.89,
      "month_3": 22.67,
      "month_6": 37.89,
      "year_1": 56.12,
      "ytd": 18.23,
      "fee": "1.5%"
    },
    {
      "code": "163402",
      "name": "兴全合润混合",
      "type": "混合型",
      "daily_return": 4.23,
      "week_1": 8.67,
      "month_1": 16.89,
      "month_3": 30.12,
      "month_6": 49.34,
      "year_1": 72.56,
      "ytd": 23.78,
      "fee": "1.5%"
    },
    {
      "code": "320007",
      "name": "诺安成长混合",
      "type": "混合型",
      "daily_return": 6.78,
      "week_1": 13.56,
      "month_1": 25.12,
      "month_3": 42.34,
      "month_6": 67.89,
      "year_1": 98.45,
      "ytd": 33.67,
      "fee": "1.5%"
    },
    {
      "code": "007119",
      "name": "汇添富中证新能源汽车指数A",
      "type": "指数型",
      "daily_return": 1.56,
      "week_1": 3.45,
      "month_1": 6.23,
      "month_3": 11.45,
      "month_6": 19.67,
      "year_1": 32.89,
      "ytd": 8.90,
      "fee": "0.5%"
    },
    {
      "code": "009084",
      "name": "华夏国证半导体芯片ETF联接A",
      "type": "指数型",
      "daily_return": 2.12,
      "week_1": 4.56,
      "month_1": 8.23,
      "month_3": 15.12,
      "month_6": 25.67,
      "year_1": 41.23,
      "ytd": 11.89,
      "fee": "0.5%"
    },
    {
      "code": "519736",
      "name": "交银趋势混合",
      "type": "混合型",
      "daily_return": 3.89,
      "week_1": 7.78,
      "month_1": 14.56,
      "month_3": 26.23,
      "month_6": 43.45,
      "year_1": 65.12,
      "ytd": 21.34,
      "fee": "1.5%"
    },
    {
      "code": "001102",
      "name": "富国天惠成长混合A",
      "type": "混合型",
      "daily_return": 2.89,
      "week_1": 6.12,
      "month_1": 10.89,
      "month_3": 19.67,
      "month_6": 33.23,
      "year_1": 50.45,
      "ytd": 15.67,
      "fee": "1.5%"
    },
    {
      "code": "000209",
      "name": "信达澳银新能源产业股票",
      "type": "股票型",
      "daily_return": 4.12,
      "week_1": 8.34,
      "month_1": 15.67,
      "month_3": 28.12,
      "month_6": 45.89,
      "year_1": 68.23,
      "ytd": 22.56,
      "fee": "1.5%"
    },
    {
      "code": "001975",
      "name": "景顺长城量化小盘股票",
      "type": "股票型",
      "daily_return": 3.23,
      "week_1": 6.67,
      "month_1": 11.89,
      "month_3": 21.34,
      "month_6": 35.67,
      "year_1": 53.89,
      "ytd": 17.12,
      "fee": "1.5%"
    },
    {
      "code": "002082",
      "name": "中欧小盘成长混合A",
      "type": "混合型",
      "daily_return": 3.67,
      "week_1": 7.45,
      "month_1": 13.23,
      "month_3": 24.12,
      "month_6": 40.34,
      "year_1": 60.56,
      "ytd": 19.78,
      "fee": "1.5%"
    },
    {
      "code": "005827",
      "name": "易方达蓝筹精选混合",
      "type": "混合型",
      "daily_return": 2.45,
      "week_1": 5.23,
      "month_1": 9.45,
      "month_3": 17.23,
      "month_6": 29.12,
      "year_1": 44.56,
      "ytd": 13.89,
      "fee": "1.5%"
    },
    {
      "code": "008763",
      "name": "汇添富中证军工ETF联接A",
      "type": "指数型",
      "daily_return": 1.78,
      "week_1": 3.89,
      "month_1": 7.12,
      "month_3": 13.23,
      "month_6": 22.45,
      "year_1": 36.78,
      "ytd": 10.12,
      "fee": "0.5%"
    },
    {
      "code": "000418",
      "name": "兴全趋势投资混合",
      "type": "混合型",
      "daily_return": 3.12,
      "week_1": 6.45,
      "month_1": 11.56,
      "month_3": 20.89,
      "month_6": 34.56,
      "year_1": 52.12,
      "ytd": 16.34,
      "fee": "1.5%"
    },
    {
      "code": "160632",
      "name": "鹏华中证酒ETF联接",
      "type": "指数型",
      "daily_return": 2.89,
      "week_1": 6.23,
      "month_1": 11.12,
      "month_3": 20.34,
      "month_6": 34.12,
      "year_1": 51.45,
      "ytd": 15.89,
      "fee": "0.5%"
    },
    {
      "code": "006751",
      "name": "嘉实中证芯片产业ETF联接A",
      "type": "指数型",
      "daily_return": 2.34,
      "week_1": 5.12,
      "month_1": 9.23,
      "month_3": 17.12,
      "month_6": 28.67,
      "year_1": 45.23,
      "ytd": 13.12,
      "fee": "0.5%"
    },
    {
      "code": "007621",
      "name": "汇添富中证科技50ETF联接A",
      "type": "指数型",
      "daily_return": 3.56,
      "week_1": 7.23,
      "month_1": 12.89,
      "month_3": 23.45,
      "month_6": 39.12,
      "year_1": 58.67,
      "ytd": 18.56,
      "fee": "0.5%"
    },
    {
      "code": "000595",
      "name": "嘉实泰和混合",
      "type": "混合型",
      "daily_return": 2.78,
      "week_1": 5.89,
      "month_1": 10.56,
      "month_3": 19.12,
      "month_6": 32.23,
      "year_1": 48.67,
      "ytd": 15.23,
      "fee": "1.5%"
    },
    {
      "code": "007301",
      "name": "广发科技先锋混合",
      "type": "混合型",
      "daily_return": 4.89,
      "week_1": 9.78,
      "month_1": 19.12,
      "month_3": 34.23,
      "month_6": 55.67,
      "year_1": 82.34,
      "ytd": 27.45,
      "fee": "1.5%"
    },
    {
      "code": "003376",
      "name": "招商中证白酒指数A",
      "type": "指数型",
      "daily_return": 2.12,
      "week_1": 4.67,
      "month_1": 8.45,
      "month_3": 15.67,
      "month_6": 26.23,
      "year_1": 41.89,
      "ytd": 12.34,
      "fee": "0.5%"
    },
    {
      "code": "161903",
      "name": "万家行业优选混合",
      "type": "混合型",
      "daily_return": 3.34,
      "week_1": 6.89,
      "month_1": 12.23,
      "month_3": 22.12,
      "month_6": 36.78,
      "year_1": 55.23,
      "ytd": 17.67,
      "fee": "1.5%"
    },
    {
      "code": "519674",
      "name": "银河创新成长混合",
      "type": "混合型",
      "daily_return": 4.67,
      "week_1": 9.34,
      "month_1": 18.12,
      "month_3": 32.34,
      "month_6": 52.56,
      "year_1": 78.12,
      "ytd": 25.23,
      "fee": "1.5%"
    },
    {
      "code": "001838",
      "name": "汇添富消费行业混合",
      "type": "混合型",
      "daily_return": 1.89,
      "week_1": 4.12,
      "month_1": 7.45,
      "month_3": 13.67,
      "month_6": 23.12,
      "year_1": 37.89,
      "ytd": 10.56,
      "fee": "1.5%"
    },
    {
      "code": "200002",
      "name": "长盛成长价值混合",
      "type": "混合型",
      "daily_return": 2.23,
      "week_1": 4.89,
      "month_1": 8.67,
      "month_3": 15.89,
      "month_6": 26.78,
      "year_1": 42.34,
      "ytd": 12.89,
      "fee": "1.5%"
    },
    {
      "code": "530015",
      "name": "建信恒久价值混合",
      "type": "混合型",
      "daily_return": 2.56,
      "week_1": 5.45,
      "month_1": 9.78,
      "month_3": 17.89,
      "month_6": 30.12,
      "year_1": 46.23,
      "ytd": 14.12,
      "fee": "1.5%"
    },
    {
      "code": "040048",
      "name": "华安策略优选混合",
      "type": "混合型",
      "daily_return": 3.01,
      "week_1": 6.23,
      "month_1": 11.12,
      "month_3": 20.12,
      "month_6": 33.56,
      "year_1": 51.23,
      "ytd": 15.89,
      "fee": "1.5%"
    },
    {
      "code": "000021",
      "name": "华宝新兴产业混合",
      "type": "混合型",
      "daily_return": 3.78,
      "week_1": 7.56,
      "month_1": 13.89,
      "month_3": 25.12,
      "month_6": 41.67,
      "year_1": 62.34,
      "ytd": 20.12,
      "fee": "1.5%"
    },
    {
      "code": "013308",
      "name": "华夏中证全指半导体ETF联接A",
      "type": "指数型",
      "daily_return": 2.56,
      "week_1": 5.34,
      "month_1": 9.67,
      "month_3": 17.89,
      "month_6": 30.23,
      "year_1": 47.56,
      "ytd": 14.34,
      "fee": "0.5%"
    },
    {
      "code": "001210",
      "name": "国富中国收益混合",
      "type": "混合型",
      "daily_return": 2.34,
      "week_1": 5.01,
      "month_1": 9.12,
      "month_3": 16.78,
      "month_6": 28.34,
      "year_1": 44.12,
      "ytd": 13.23,
      "fee": "1.5%"
    },
    {
      "code": "166002",
      "name": "中欧价值发现混合A",
      "type": "混合型",
      "daily_return": 2.89,
      "week_1": 6.01,
      "month_1": 10.78,
      "month_3": 19.45,
      "month_6": 32.67,
      "year_1": 49.89,
      "ytd": 15.34,
      "fee": "1.5%"
    },
    {
      "code": "004040",
      "name": "华夏国证计算机行业ETF联接A",
      "type": "指数型",
      "daily_return": 3.12,
      "week_1": 6.45,
      "month_1": 11.56,
      "month_3": 21.12,
      "month_6": 35.34,
      "year_1": 53.12,
      "ytd": 16.78,
      "fee": "0.5%"
    },
    {
      "code": "000942",
      "name": "广发多因子混合",
      "type": "混合型",
      "daily_return": 2.67,
      "week_1": 5.56,
      "month_1": 9.89,
      "month_3": 18.12,
      "month_6": 30.45,
      "year_1": 46.78,
      "ytd": 14.23,
      "fee": "1.5%"
    },
    {
      "code": "003003",
      "name": "中邮核心成长混合",
      "type": "混合型",
      "daily_return": 3.56,
      "week_1": 7.12,
      "month_1": 12.78,
      "month_3": 23.12,
      "month_6": 38.45,
      "year_1": 57.89,
      "ytd": 18.34,
      "fee": "1.5%"
    },
    {
      "code": "001643",
      "name": "汇添富全球医疗QDII混合",
      "type": "QDII",
      "daily_return": -0.56,
      "week_1": -1.12,
      "month_1": 4.23,
      "month_3": 9.45,
      "month_6": 16.78,
      "year_1": 28.90,
      "ytd": 6.12,
      "fee": "1.0%"
    },
    {
      "code": "000083",
      "name": "汇添富成长焦点混合",
      "type": "混合型",
      "daily_return": 3.23,
      "week_1": 6.78,
      "month_1": 12.12,
      "month_3": 22.23,
      "month_6": 37.12,
      "year_1": 55.67,
      "ytd": 17.89,
      "fee": "1.5%"
    },
    {
      "code": "001616",
      "name": "中银新回报灵活配置混合A",
      "type": "混合型",
      "daily_return": 1.67,
      "week_1": 3.56,
      "month_1": 6.45,
      "month_3": 11.89,
      "month_6": 20.12,
      "year_1": 32.45,
      "ytd": 9.23,
      "fee": "1.5%"
    },
    {
      "code": "519688",
      "name": "交银精选混合",
      "type": "混合型",
      "daily_return": 2.12,
      "week_1": 4.56,
      "month_1": 8.23,
      "month_3": 15.12,
      "month_6": 25.45,
      "year_1": 40.78,
      "ytd": 12.12,
      "fee": "1.5%"
    },
    {
      "code": "470058",
      "name": "汇添富价值精选混合",
      "type": "混合型",
      "daily_return": 2.45,
      "week_1": 5.12,
      "month_1": 9.23,
      "month_3": 16.89,
      "month_6": 28.45,
      "year_1": 43.78,
      "ytd": 13.56,
      "fee": "1.5%"
    },
    {
      "code": "000031",
      "name": "华夏收入混合",
      "type": "混合型",
      "daily_return": 1.45,
      "week_1": 3.12,
      "month_1": 5.67,
      "month_3": 10.45,
      "month_6": 17.89,
      "year_1": 29.34,
      "ytd": 8.12,
      "fee": "1.5%"
    },
    {
      "code": "005450",
      "name": "华夏中证5G通信主题ETF联接A",
      "type": "指数型",
      "daily_return": 2.78,
      "week_1": 5.67,
      "month_1": 10.12,
      "month_3": 18.56,
      "month_6": 31.12,
      "year_1": 48.45,
      "ytd": 14.78,
      "fee": "0.5%"
    }
  ],
  "insights": [
    {
      "label": "今日最强板块",
      "value": "金融板块领涨，<span class='highlight-up'>+1.64%</span>，主力净流入 <span class='highlight-up'>+38.6亿</span>",
      "sub": "金融板块受国有大行股价上涨拉动，保险、证券跟涨"
    },
    {
      "label": "今日最弱板块",
      "value": "房地产跌幅居首，<span class='highlight-down'>-2.32%</span>，资金持续流出",
      "sub": "政策预期降温，房地产调控持续，板块承压"
    },
    {
      "label": "基金综合排名冠军",
      "value": "<span class='highlight-accent'>诺安成长混合 (320007)</span> 日涨 <span class='highlight-up'>+6.78%</span>",
      "sub": "半导体芯片持仓受益，今年来累计涨幅 +33.67%"
    },
    {
      "label": "资金流向提示",
      "value": "今日主力净流入 <span class='highlight-up'>+82.3亿</span>，市场情绪偏多",
      "sub": "超大单净流入 +51.2亿，大单净流入 +31.1亿，小单净流出 -70.0亿"
    },
    {
      "label": "今日指数概览",
      "value": "沪深300 <span class='highlight-up'>+0.38%</span>，上证指数 <span class='highlight-up'>+0.47%</span>，创业板 <span class='highlight-down'>-0.49%</span>",
      "sub": "大盘蓝筹相对强势，成长科技板块调整"
    },
    {
      "label": "北向资金动态",
      "value": "北证50 <span class='highlight-down'>-3.99%</span>，北交所流出显著",
      "sub": "北交所市场情绪偏弱，建议关注北向资金后续动向"
    }
  ],
  "meta": {
    "trading_date": "2026-02-28",
    "update_time": "2026-02-28 18:00:00",
    "next_update": "2026-03-01 09:35:00",
    "data_source": "东方财富、天天基金"
  }
};
