import countriesData from './countriesData'
// 所有省市, 用于匹配选中的是省还是市

// eslint-disable-next-line
export default {
  countries: countriesData,
  provinces: [
    {
      name: '北京市',
      id: '110000'
    },
    {
      name: '天津市',
      id: '120000'
    },
    {
      name: '河北省',
      id: '130000'
    },
    {
      name: '山西省',
      id: '140000'
    },
    {
      name: '内蒙古自治区',
      id: '150000'
    },
    {
      name: '辽宁省',
      id: '210000'
    },
    {
      name: '吉林省',
      id: '220000'
    },
    {
      name: '黑龙江省',
      id: '230000'
    },
    {
      name: '上海市',
      id: '310000'
    },
    {
      name: '江苏省',
      id: '320000'
    },
    {
      name: '浙江省',
      id: '330000'
    },
    {
      name: '安徽省',
      id: '340000'
    },
    {
      name: '福建省',
      id: '350000'
    },
    {
      name: '江西省',
      id: '360000'
    },
    {
      name: '山东省',
      id: '370000'
    },
    {
      name: '河南省',
      id: '410000'
    },
    {
      name: '湖北省',
      id: '420000'
    },
    {
      name: '湖南省',
      id: '430000'
    },
    {
      name: '广东省',
      id: '440000'
    },
    {
      name: '广西壮族自治区',
      id: '450000'
    },
    {
      name: '海南省',
      id: '460000'
    },
    {
      name: '重庆市',
      id: '500000'
    },
    {
      name: '四川省',
      id: '510000'
    },
    {
      name: '贵州省',
      id: '520000'
    },
    {
      name: '云南省',
      id: '530000'
    },
    {
      name: '西藏自治区',
      id: '540000'
    },
    {
      name: '陕西省',
      id: '610000'
    },
    {
      name: '甘肃省',
      id: '620000'
    },
    {
      name: '青海省',
      id: '630000'
    },
    {
      name: '宁夏回族自治区',
      id: '640000'
    },
    {
      name: '新疆维吾尔自治区',
      id: '650000'
    },
    {
      name: '台湾省',
      id: '710000'
    },
    {
      name: '香港特别行政区',
      id: '810000'
    },
    {
      name: '澳门特别行政区',
      id: '820000'
    }
  ],
  cities: [
    {
      name: '北京市',
      id: '110000'
    },
    {
      name: '天津市',
      id: '120000'
    },
    {
      name: '上海市',
      id: '310000'
    },
    {
      name: '重庆市',
      id: '500000'
    },
    {
      name: '香港特别行政区',
      id: '810000'
    },
    {
      name: '澳门特别行政区',
      id: '820000'
    },
    {
      name: '石家庄市',
      id: '130100',
      parentid: '130000'
    },
    {
      name: '唐山市',
      id: '130200',
      parentid: '130000'
    },
    {
      name: '秦皇岛市',
      id: '130300',
      parentid: '130000'
    },
    {
      name: '邯郸市',
      id: '130400',
      parentid: '130000'
    },
    {
      name: '邢台市',
      id: '130500',
      parentid: '130000'
    },
    {
      name: '保定市',
      id: '130600',
      parentid: '130000'
    },
    {
      name: '张家口市',
      id: '130700',
      parentid: '130000'
    },
    {
      name: '承德市',
      id: '130800',
      parentid: '130000'
    },
    {
      name: '沧州市',
      id: '130900',
      parentid: '130000'
    },
    {
      name: '廊坊市',
      id: '131000',
      parentid: '130000'
    },
    {
      name: '衡水市',
      id: '131100',
      parentid: '130000'
    },
    {
      name: '太原市',
      id: '140100',
      parentid: '140000'
    },
    {
      name: '大同市',
      id: '140200',
      parentid: '140000'
    },
    {
      name: '阳泉市',
      id: '140300',
      parentid: '140000'
    },
    {
      name: '长治市',
      id: '140400',
      parentid: '140000'
    },
    {
      name: '晋城市',
      id: '140500',
      parentid: '140000'
    },
    {
      name: '朔州市',
      id: '140600',
      parentid: '140000'
    },
    {
      name: '晋中市',
      id: '140700',
      parentid: '140000'
    },
    {
      name: '运城市',
      id: '140800',
      parentid: '140000'
    },
    {
      name: '忻州市',
      id: '140900',
      parentid: '140000'
    },
    {
      name: '临汾市',
      id: '141000',
      parentid: '140000'
    },
    {
      name: '吕梁市',
      id: '141100',
      parentid: '140000'
    },
    {
      name: '呼和浩特市',
      id: '150100',
      parentid: '150000'
    },
    {
      name: '包头市',
      id: '150200',
      parentid: '150000'
    },
    {
      name: '乌海市',
      id: '150300',
      parentid: '150000'
    },
    {
      name: '赤峰市',
      id: '150400',
      parentid: '150000'
    },
    {
      name: '通辽市',
      id: '150500',
      parentid: '150000'
    },
    {
      name: '鄂尔多斯市',
      id: '150600',
      parentid: '150000'
    },
    {
      name: '呼伦贝尔市',
      id: '150700',
      parentid: '150000'
    },
    {
      name: '巴彦淖尔市',
      id: '150800',
      parentid: '150000'
    },
    {
      name: '乌兰察布市',
      id: '150900',
      parentid: '150000'
    },
    {
      name: '兴安盟',
      id: '152200',
      parentid: '150000'
    },
    {
      name: '锡林郭勒盟',
      id: '152500',
      parentid: '150000'
    },
    {
      name: '阿拉善盟',
      id: '152900',
      parentid: '150000'
    },
    {
      name: '沈阳市',
      id: '210100',
      parentid: '210000'
    },
    {
      name: '大连市',
      id: '210200',
      parentid: '210000'
    },
    {
      name: '鞍山市',
      id: '210300',
      parentid: '210000'
    },
    {
      name: '抚顺市',
      id: '210400',
      parentid: '210000'
    },
    {
      name: '本溪市',
      id: '210500',
      parentid: '210000'
    },
    {
      name: '丹东市',
      id: '210600',
      parentid: '210000'
    },
    {
      name: '锦州市',
      id: '210700',
      parentid: '210000'
    },
    {
      name: '营口市',
      id: '210800',
      parentid: '210000'
    },
    {
      name: '阜新市',
      id: '210900',
      parentid: '210000'
    },
    {
      name: '辽阳市',
      id: '211000',
      parentid: '210000'
    },
    {
      name: '盘锦市',
      id: '211100',
      parentid: '210000'
    },
    {
      name: '铁岭市',
      id: '211200',
      parentid: '210000'
    },
    {
      name: '朝阳市',
      id: '211300',
      parentid: '210000'
    },
    {
      name: '葫芦岛市',
      id: '211400',
      parentid: '210000'
    },
    {
      name: '长春市',
      id: '220100',
      parentid: '220000'
    },
    {
      name: '吉林市',
      id: '220200',
      parentid: '220000'
    },
    {
      name: '四平市',
      id: '220300',
      parentid: '220000'
    },
    {
      name: '辽源市',
      id: '220400',
      parentid: '220000'
    },
    {
      name: '通化市',
      id: '220500',
      parentid: '220000'
    },
    {
      name: '白山市',
      id: '220600',
      parentid: '220000'
    },
    {
      name: '松原市',
      id: '220700',
      parentid: '220000'
    },
    {
      name: '白城市',
      id: '220800',
      parentid: '220000'
    },
    {
      name: '延边朝鲜族自治州',
      id: '222400',
      parentid: '220000'
    },
    {
      name: '哈尔滨市',
      id: '230100',
      parentid: '230000'
    },
    {
      name: '齐齐哈尔市',
      id: '230200',
      parentid: '230000'
    },
    {
      name: '鸡西市',
      id: '230300',
      parentid: '230000'
    },
    {
      name: '鹤岗市',
      id: '230400',
      parentid: '230000'
    },
    {
      name: '双鸭山市',
      id: '230500',
      parentid: '230000'
    },
    {
      name: '大庆市',
      id: '230600',
      parentid: '230000'
    },
    {
      name: '伊春市',
      id: '230700',
      parentid: '230000'
    },
    {
      name: '佳木斯市',
      id: '230800',
      parentid: '230000'
    },
    {
      name: '七台河市',
      id: '230900',
      parentid: '230000'
    },
    {
      name: '牡丹江市',
      id: '231000',
      parentid: '230000'
    },
    {
      name: '黑河市',
      id: '231100',
      parentid: '230000'
    },
    {
      name: '绥化市',
      id: '231200',
      parentid: '230000'
    },
    {
      name: '大兴安岭地区',
      id: '232700',
      parentid: '230000'
    },
    {
      name: '南京市',
      id: '320100',
      parentid: '320000'
    },
    {
      name: '无锡市',
      id: '320200',
      parentid: '320000'
    },
    {
      name: '徐州市',
      id: '320300',
      parentid: '320000'
    },
    {
      name: '常州市',
      id: '320400',
      parentid: '320000'
    },
    {
      name: '苏州市',
      id: '320500',
      parentid: '320000'
    },
    {
      name: '南通市',
      id: '320600',
      parentid: '320000'
    },
    {
      name: '连云港市',
      id: '320700',
      parentid: '320000'
    },
    {
      name: '淮安市',
      id: '320800',
      parentid: '320000'
    },
    {
      name: '盐城市',
      id: '320900',
      parentid: '320000'
    },
    {
      name: '扬州市',
      id: '321000',
      parentid: '320000'
    },
    {
      name: '镇江市',
      id: '321100',
      parentid: '320000'
    },
    {
      name: '泰州市',
      id: '321200',
      parentid: '320000'
    },
    {
      name: '宿迁市',
      id: '321300',
      parentid: '320000'
    },
    {
      name: '杭州市',
      id: '330100',
      parentid: '330000'
    },
    {
      name: '宁波市',
      id: '330200',
      parentid: '330000'
    },
    {
      name: '温州市',
      id: '330300',
      parentid: '330000'
    },
    {
      name: '嘉兴市',
      id: '330400',
      parentid: '330000'
    },
    {
      name: '湖州市',
      id: '330500',
      parentid: '330000'
    },
    {
      name: '绍兴市',
      id: '330600',
      parentid: '330000'
    },
    {
      name: '金华市',
      id: '330700',
      parentid: '330000'
    },
    {
      name: '衢州市',
      id: '330800',
      parentid: '330000'
    },
    {
      name: '舟山市',
      id: '330900',
      parentid: '330000'
    },
    {
      name: '台州市',
      id: '331000',
      parentid: '330000'
    },
    {
      name: '丽水市',
      id: '331100',
      parentid: '330000'
    },
    {
      name: '合肥市',
      id: '340100',
      parentid: '340000'
    },
    {
      name: '芜湖市',
      id: '340200',
      parentid: '340000'
    },
    {
      name: '蚌埠市',
      id: '340300',
      parentid: '340000'
    },
    {
      name: '淮南市',
      id: '340400',
      parentid: '340000'
    },
    {
      name: '马鞍山市',
      id: '340500',
      parentid: '340000'
    },
    {
      name: '淮北市',
      id: '340600',
      parentid: '340000'
    },
    {
      name: '铜陵市',
      id: '340700',
      parentid: '340000'
    },
    {
      name: '安庆市',
      id: '340800',
      parentid: '340000'
    },
    {
      name: '黄山市',
      id: '341000',
      parentid: '340000'
    },
    {
      name: '滁州市',
      id: '341100',
      parentid: '340000'
    },
    {
      name: '阜阳市',
      id: '341200',
      parentid: '340000'
    },
    {
      name: '宿州市',
      id: '341300',
      parentid: '340000'
    },
    {
      name: '六安市',
      id: '341500',
      parentid: '340000'
    },
    {
      name: '亳州市',
      id: '341600',
      parentid: '340000'
    },
    {
      name: '池州市',
      id: '341700',
      parentid: '340000'
    },
    {
      name: '宣城市',
      id: '341800',
      parentid: '340000'
    },
    {
      name: '福州市',
      id: '350100',
      parentid: '350000'
    },
    {
      name: '厦门市',
      id: '350200',
      parentid: '350000'
    },
    {
      name: '莆田市',
      id: '350300',
      parentid: '350000'
    },
    {
      name: '三明市',
      id: '350400',
      parentid: '350000'
    },
    {
      name: '泉州市',
      id: '350500',
      parentid: '350000'
    },
    {
      name: '漳州市',
      id: '350600',
      parentid: '350000'
    },
    {
      name: '南平市',
      id: '350700',
      parentid: '350000'
    },
    {
      name: '龙岩市',
      id: '350800',
      parentid: '350000'
    },
    {
      name: '宁德市',
      id: '350900',
      parentid: '350000'
    },
    {
      name: '南昌市',
      id: '360100',
      parentid: '360000'
    },
    {
      name: '景德镇市',
      id: '360200',
      parentid: '360000'
    },
    {
      name: '萍乡市',
      id: '360300',
      parentid: '360000'
    },
    {
      name: '九江市',
      id: '360400',
      parentid: '360000'
    },
    {
      name: '新余市',
      id: '360500',
      parentid: '360000'
    },
    {
      name: '鹰潭市',
      id: '360600',
      parentid: '360000'
    },
    {
      name: '赣州市',
      id: '360700',
      parentid: '360000'
    },
    {
      name: '吉安市',
      id: '360800',
      parentid: '360000'
    },
    {
      name: '宜春市',
      id: '360900',
      parentid: '360000'
    },
    {
      name: '抚州市',
      id: '361000',
      parentid: '360000'
    },
    {
      name: '上饶市',
      id: '361100',
      parentid: '360000'
    },
    {
      name: '济南市',
      id: '370100',
      parentid: '370000'
    },
    {
      name: '青岛市',
      id: '370200',
      parentid: '370000'
    },
    {
      name: '淄博市',
      id: '370300',
      parentid: '370000'
    },
    {
      name: '枣庄市',
      id: '370400',
      parentid: '370000'
    },
    {
      name: '东营市',
      id: '370500',
      parentid: '370000'
    },
    {
      name: '烟台市',
      id: '370600',
      parentid: '370000'
    },
    {
      name: '潍坊市',
      id: '370700',
      parentid: '370000'
    },
    {
      name: '济宁市',
      id: '370800',
      parentid: '370000'
    },
    {
      name: '泰安市',
      id: '370900',
      parentid: '370000'
    },
    {
      name: '威海市',
      id: '371000',
      parentid: '370000'
    },
    {
      name: '日照市',
      id: '371100',
      parentid: '370000'
    },
    {
      name: '临沂市',
      id: '371300',
      parentid: '370000'
    },
    {
      name: '德州市',
      id: '371400',
      parentid: '370000'
    },
    {
      name: '聊城市',
      id: '371500',
      parentid: '370000'
    },
    {
      name: '滨州市',
      id: '371600',
      parentid: '370000'
    },
    {
      name: '菏泽市',
      id: '371700',
      parentid: '370000'
    },
    {
      name: '郑州市',
      id: '410100',
      parentid: '410000'
    },
    {
      name: '开封市',
      id: '410200',
      parentid: '410000'
    },
    {
      name: '洛阳市',
      id: '410300',
      parentid: '410000'
    },
    {
      name: '平顶山市',
      id: '410400',
      parentid: '410000'
    },
    {
      name: '安阳市',
      id: '410500',
      parentid: '410000'
    },
    {
      name: '鹤壁市',
      id: '410600',
      parentid: '410000'
    },
    {
      name: '新乡市',
      id: '410700',
      parentid: '410000'
    },
    {
      name: '焦作市',
      id: '410800',
      parentid: '410000'
    },
    {
      name: '濮阳市',
      id: '410900',
      parentid: '410000'
    },
    {
      name: '许昌市',
      id: '411000',
      parentid: '410000'
    },
    {
      name: '漯河市',
      id: '411100',
      parentid: '410000'
    },
    {
      name: '三门峡市',
      id: '411200',
      parentid: '410000'
    },
    {
      name: '南阳市',
      id: '411300',
      parentid: '410000'
    },
    {
      name: '商丘市',
      id: '411400',
      parentid: '410000'
    },
    {
      name: '信阳市',
      id: '411500',
      parentid: '410000'
    },
    {
      name: '周口市',
      id: '411600',
      parentid: '410000'
    },
    {
      name: '驻马店市',
      id: '411700',
      parentid: '410000'
    },
    {
      name: '济源市',
      id: '419001',
      parentid: '410000'
    },
    {
      name: '武汉市',
      id: '420100',
      parentid: '420000'
    },
    {
      name: '黄石市',
      id: '420200',
      parentid: '420000'
    },
    {
      name: '十堰市',
      id: '420300',
      parentid: '420000'
    },
    {
      name: '宜昌市',
      id: '420500',
      parentid: '420000'
    },
    {
      name: '襄阳市',
      id: '420600',
      parentid: '420000'
    },
    {
      name: '鄂州市',
      id: '420700',
      parentid: '420000'
    },
    {
      name: '荆门市',
      id: '420800',
      parentid: '420000'
    },
    {
      name: '孝感市',
      id: '420900',
      parentid: '420000'
    },
    {
      name: '荆州市',
      id: '421000',
      parentid: '420000'
    },
    {
      name: '黄冈市',
      id: '421100',
      parentid: '420000'
    },
    {
      name: '咸宁市',
      id: '421200',
      parentid: '420000'
    },
    {
      name: '随州市',
      id: '421300',
      parentid: '420000'
    },
    {
      name: '恩施土家族苗族自治州',
      id: '422800',
      parentid: '420000'
    },
    {
      name: '仙桃市',
      id: '429004',
      parentid: '420000'
    },
    {
      name: '潜江市',
      id: '429005',
      parentid: '420000'
    },
    {
      name: '天门市',
      id: '429006',
      parentid: '420000'
    },
    {
      name: '神农架林区',
      id: '429021',
      parentid: '420000'
    },
    {
      name: '长沙市',
      id: '430100',
      parentid: '430000'
    },
    {
      name: '株洲市',
      id: '430200',
      parentid: '430000'
    },
    {
      name: '湘潭市',
      id: '430300',
      parentid: '430000'
    },
    {
      name: '衡阳市',
      id: '430400',
      parentid: '430000'
    },
    {
      name: '邵阳市',
      id: '430500',
      parentid: '430000'
    },
    {
      name: '岳阳市',
      id: '430600',
      parentid: '430000'
    },
    {
      name: '常德市',
      id: '430700',
      parentid: '430000'
    },
    {
      name: '张家界市',
      id: '430800',
      parentid: '430000'
    },
    {
      name: '益阳市',
      id: '430900',
      parentid: '430000'
    },
    {
      name: '郴州市',
      id: '431000',
      parentid: '430000'
    },
    {
      name: '永州市',
      id: '431100',
      parentid: '430000'
    },
    {
      name: '怀化市',
      id: '431200',
      parentid: '430000'
    },
    {
      name: '娄底市',
      id: '431300',
      parentid: '430000'
    },
    {
      name: '湘西土家族苗族自治州',
      id: '433100',
      parentid: '430000'
    },
    {
      name: '广州市',
      id: '440100',
      parentid: '440000'
    },
    {
      name: '韶关市',
      id: '440200',
      parentid: '440000'
    },
    {
      name: '深圳市',
      id: '440300',
      parentid: '440000'
    },
    {
      name: '珠海市',
      id: '440400',
      parentid: '440000'
    },
    {
      name: '汕头市',
      id: '440500',
      parentid: '440000'
    },
    {
      name: '佛山市',
      id: '440600',
      parentid: '440000'
    },
    {
      name: '江门市',
      id: '440700',
      parentid: '440000'
    },
    {
      name: '湛江市',
      id: '440800',
      parentid: '440000'
    },
    {
      name: '茂名市',
      id: '440900',
      parentid: '440000'
    },
    {
      name: '肇庆市',
      id: '441200',
      parentid: '440000'
    },
    {
      name: '惠州市',
      id: '441300',
      parentid: '440000'
    },
    {
      name: '梅州市',
      id: '441400',
      parentid: '440000'
    },
    {
      name: '汕尾市',
      id: '441500',
      parentid: '440000'
    },
    {
      name: '河源市',
      id: '441600',
      parentid: '440000'
    },
    {
      name: '阳江市',
      id: '441700',
      parentid: '440000'
    },
    {
      name: '清远市',
      id: '441800',
      parentid: '440000'
    },
    {
      name: '东莞市',
      id: '441900',
      parentid: '440000'
    },
    {
      name: '中山市',
      id: '442000',
      parentid: '440000'
    },
    {
      name: '潮州市',
      id: '445100',
      parentid: '440000'
    },
    {
      name: '揭阳市',
      id: '445200',
      parentid: '440000'
    },
    {
      name: '云浮市',
      id: '445300',
      parentid: '440000'
    },
    {
      name: '南宁市',
      id: '450100',
      parentid: '450000'
    },
    {
      name: '柳州市',
      id: '450200',
      parentid: '450000'
    },
    {
      name: '桂林市',
      id: '450300',
      parentid: '450000'
    },
    {
      name: '梧州市',
      id: '450400',
      parentid: '450000'
    },
    {
      name: '北海市',
      id: '450500',
      parentid: '450000'
    },
    {
      name: '防城港市',
      id: '450600',
      parentid: '450000'
    },
    {
      name: '钦州市',
      id: '450700',
      parentid: '450000'
    },
    {
      name: '贵港市',
      id: '450800',
      parentid: '450000'
    },
    {
      name: '玉林市',
      id: '450900',
      parentid: '450000'
    },
    {
      name: '百色市',
      id: '451000',
      parentid: '450000'
    },
    {
      name: '贺州市',
      id: '451100',
      parentid: '450000'
    },
    {
      name: '河池市',
      id: '451200',
      parentid: '450000'
    },
    {
      name: '来宾市',
      id: '451300',
      parentid: '450000'
    },
    {
      name: '崇左市',
      id: '451400',
      parentid: '450000'
    },
    {
      name: '海口市',
      id: '460100',
      parentid: '460000'
    },
    {
      name: '三亚市',
      id: '460200',
      parentid: '460000'
    },
    {
      name: '三沙市',
      id: '460300',
      parentid: '460000'
    },
    {
      name: '儋州市',
      id: '460400',
      parentid: '460000'
    },
    {
      name: '五指山市',
      id: '469001',
      parentid: '460000'
    },
    {
      name: '琼海市',
      id: '469002',
      parentid: '460000'
    },
    {
      name: '文昌市',
      id: '469005',
      parentid: '460000'
    },
    {
      name: '万宁市',
      id: '469006',
      parentid: '460000'
    },
    {
      name: '东方市',
      id: '469007',
      parentid: '460000'
    },
    {
      name: '定安县',
      id: '469021',
      parentid: '460000'
    },
    {
      name: '屯昌县',
      id: '469022',
      parentid: '460000'
    },
    {
      name: '澄迈县',
      id: '469023',
      parentid: '460000'
    },
    {
      name: '临高县',
      id: '469024',
      parentid: '460000'
    },
    {
      name: '白沙黎族自治县',
      id: '469025',
      parentid: '460000'
    },
    {
      name: '昌江黎族自治县',
      id: '469026',
      parentid: '460000'
    },
    {
      name: '乐东黎族自治县',
      id: '469027',
      parentid: '460000'
    },
    {
      name: '陵水黎族自治县',
      id: '469028',
      parentid: '460000'
    },
    {
      name: '保亭黎族苗族自治县',
      id: '469029',
      parentid: '460000'
    },
    {
      name: '琼中黎族苗族自治县',
      id: '469030',
      parentid: '460000'
    },
    {
      name: '成都市',
      id: '510100',
      parentid: '510000'
    },
    {
      name: '自贡市',
      id: '510300',
      parentid: '510000'
    },
    {
      name: '攀枝花市',
      id: '510400',
      parentid: '510000'
    },
    {
      name: '泸州市',
      id: '510500',
      parentid: '510000'
    },
    {
      name: '德阳市',
      id: '510600',
      parentid: '510000'
    },
    {
      name: '绵阳市',
      id: '510700',
      parentid: '510000'
    },
    {
      name: '广元市',
      id: '510800',
      parentid: '510000'
    },
    {
      name: '遂宁市',
      id: '510900',
      parentid: '510000'
    },
    {
      name: '内江市',
      id: '511000',
      parentid: '510000'
    },
    {
      name: '乐山市',
      id: '511100',
      parentid: '510000'
    },
    {
      name: '南充市',
      id: '511300',
      parentid: '510000'
    },
    {
      name: '眉山市',
      id: '511400',
      parentid: '510000'
    },
    {
      name: '宜宾市',
      id: '511500',
      parentid: '510000'
    },
    {
      name: '广安市',
      id: '511600',
      parentid: '510000'
    },
    {
      name: '达州市',
      id: '511700',
      parentid: '510000'
    },
    {
      name: '雅安市',
      id: '511800',
      parentid: '510000'
    },
    {
      name: '巴中市',
      id: '511900',
      parentid: '510000'
    },
    {
      name: '资阳市',
      id: '512000',
      parentid: '510000'
    },
    {
      name: '阿坝藏族羌族自治州',
      id: '513200',
      parentid: '510000'
    },
    {
      name: '甘孜藏族自治州',
      id: '513300',
      parentid: '510000'
    },
    {
      name: '凉山彝族自治州',
      id: '513400',
      parentid: '510000'
    },
    {
      name: '贵阳市',
      id: '520100',
      parentid: '520000'
    },
    {
      name: '六盘水市',
      id: '520200',
      parentid: '520000'
    },
    {
      name: '遵义市',
      id: '520300',
      parentid: '520000'
    },
    {
      name: '安顺市',
      id: '520400',
      parentid: '520000'
    },
    {
      name: '毕节市',
      id: '520500',
      parentid: '520000'
    },
    {
      name: '铜仁市',
      id: '520600',
      parentid: '520000'
    },
    {
      name: '黔西南布依族苗族自治州',
      id: '522300',
      parentid: '520000'
    },
    {
      name: '黔东南苗族侗族自治州',
      id: '522600',
      parentid: '520000'
    },
    {
      name: '黔南布依族苗族自治州',
      id: '522700',
      parentid: '520000'
    },
    {
      name: '昆明市',
      id: '530100',
      parentid: '530000'
    },
    {
      name: '曲靖市',
      id: '530300',
      parentid: '530000'
    },
    {
      name: '玉溪市',
      id: '530400',
      parentid: '530000'
    },
    {
      name: '保山市',
      id: '530500',
      parentid: '530000'
    },
    {
      name: '昭通市',
      id: '530600',
      parentid: '530000'
    },
    {
      name: '丽江市',
      id: '530700',
      parentid: '530000'
    },
    {
      name: '普洱市',
      id: '530800',
      parentid: '530000'
    },
    {
      name: '临沧市',
      id: '530900',
      parentid: '530000'
    },
    {
      name: '楚雄彝族自治州',
      id: '532300',
      parentid: '530000'
    },
    {
      name: '红河哈尼族彝族自治州',
      id: '532500',
      parentid: '530000'
    },
    {
      name: '文山壮族苗族自治州',
      id: '532600',
      parentid: '530000'
    },
    {
      name: '西双版纳傣族自治州',
      id: '532800',
      parentid: '530000'
    },
    {
      name: '大理白族自治州',
      id: '532900',
      parentid: '530000'
    },
    {
      name: '德宏傣族景颇族自治州',
      id: '533100',
      parentid: '530000'
    },
    {
      name: '怒江傈僳族自治州',
      id: '533300',
      parentid: '530000'
    },
    {
      name: '迪庆藏族自治州',
      id: '533400',
      parentid: '530000'
    },
    {
      name: '拉萨市',
      id: '540100',
      parentid: '540000'
    },
    {
      name: '日喀则市',
      id: '540200',
      parentid: '540000'
    },
    {
      name: '昌都市',
      id: '540300',
      parentid: '540000'
    },
    {
      name: '林芝市',
      id: '540400',
      parentid: '540000'
    },
    {
      name: '山南市',
      id: '540500',
      parentid: '540000'
    },
    {
      name: '那曲市',
      id: '540600',
      parentid: '540000'
    },
    {
      name: '阿里地区',
      id: '542500',
      parentid: '540000'
    },
    {
      name: '西安市',
      id: '610100',
      parentid: '610000'
    },
    {
      name: '铜川市',
      id: '610200',
      parentid: '610000'
    },
    {
      name: '宝鸡市',
      id: '610300',
      parentid: '610000'
    },
    {
      name: '咸阳市',
      id: '610400',
      parentid: '610000'
    },
    {
      name: '渭南市',
      id: '610500',
      parentid: '610000'
    },
    {
      name: '延安市',
      id: '610600',
      parentid: '610000'
    },
    {
      name: '汉中市',
      id: '610700',
      parentid: '610000'
    },
    {
      name: '榆林市',
      id: '610800',
      parentid: '610000'
    },
    {
      name: '安康市',
      id: '610900',
      parentid: '610000'
    },
    {
      name: '商洛市',
      id: '611000',
      parentid: '610000'
    },
    {
      name: '兰州市',
      id: '620100',
      parentid: '620000'
    },
    {
      name: '嘉峪关市',
      id: '620200',
      parentid: '620000'
    },
    {
      name: '金昌市',
      id: '620300',
      parentid: '620000'
    },
    {
      name: '白银市',
      id: '620400',
      parentid: '620000'
    },
    {
      name: '天水市',
      id: '620500',
      parentid: '620000'
    },
    {
      name: '武威市',
      id: '620600',
      parentid: '620000'
    },
    {
      name: '张掖市',
      id: '620700',
      parentid: '620000'
    },
    {
      name: '平凉市',
      id: '620800',
      parentid: '620000'
    },
    {
      name: '酒泉市',
      id: '620900',
      parentid: '620000'
    },
    {
      name: '庆阳市',
      id: '621000',
      parentid: '620000'
    },
    {
      name: '定西市',
      id: '621100',
      parentid: '620000'
    },
    {
      name: '陇南市',
      id: '621200',
      parentid: '620000'
    },
    {
      name: '临夏回族自治州',
      id: '622900',
      parentid: '620000'
    },
    {
      name: '甘南藏族自治州',
      id: '623000',
      parentid: '620000'
    },
    {
      name: '西宁市',
      id: '630100',
      parentid: '630000'
    },
    {
      name: '海东市',
      id: '630200',
      parentid: '630000'
    },
    {
      name: '海北藏族自治州',
      id: '632200',
      parentid: '630000'
    },
    {
      name: '黄南藏族自治州',
      id: '632300',
      parentid: '630000'
    },
    {
      name: '海南藏族自治州',
      id: '632500',
      parentid: '630000'
    },
    {
      name: '果洛藏族自治州',
      id: '632600',
      parentid: '630000'
    },
    {
      name: '玉树藏族自治州',
      id: '632700',
      parentid: '630000'
    },
    {
      name: '海西蒙古族藏族自治州',
      id: '632800',
      parentid: '630000'
    },
    {
      name: '银川市',
      id: '640100',
      parentid: '640000'
    },
    {
      name: '石嘴山市',
      id: '640200',
      parentid: '640000'
    },
    {
      name: '吴忠市',
      id: '640300',
      parentid: '640000'
    },
    {
      name: '固原市',
      id: '640400',
      parentid: '640000'
    },
    {
      name: '中卫市',
      id: '640500',
      parentid: '640000'
    },
    {
      name: '乌鲁木齐市',
      id: '650100',
      parentid: '650000'
    },
    {
      name: '克拉玛依市',
      id: '650200',
      parentid: '650000'
    },
    {
      name: '吐鲁番市',
      id: '650400',
      parentid: '650000'
    },
    {
      name: '哈密市',
      id: '650500',
      parentid: '650000'
    },
    {
      name: '昌吉回族自治州',
      id: '652300',
      parentid: '650000'
    },
    {
      name: '博尔塔拉蒙古自治州',
      id: '652700',
      parentid: '650000'
    },
    {
      name: '巴音郭楞蒙古自治州',
      id: '652800',
      parentid: '650000'
    },
    {
      name: '阿克苏地区',
      id: '652900',
      parentid: '650000'
    },
    {
      name: '克孜勒苏柯尔克孜自治州',
      id: '653000',
      parentid: '650000'
    },
    {
      name: '喀什地区',
      id: '653100',
      parentid: '650000'
    },
    {
      name: '和田地区',
      id: '653200',
      parentid: '650000'
    },
    {
      name: '伊犁哈萨克自治州',
      id: '654000',
      parentid: '650000'
    },
    {
      name: '塔城地区',
      id: '654200',
      parentid: '650000'
    },
    {
      name: '阿勒泰地区',
      id: '654300',
      parentid: '650000'
    },
    {
      name: '石河子市',
      id: '659001',
      parentid: '650000'
    },
    {
      name: '阿拉尔市',
      id: '659002',
      parentid: '650000'
    },
    {
      name: '图木舒克市',
      id: '659003',
      parentid: '650000'
    },
    {
      name: '五家渠市',
      id: '659004',
      parentid: '650000'
    },
    {
      name: '北屯市',
      id: '659005',
      parentid: '650000'
    },
    {
      name: '铁门关市',
      id: '659006',
      parentid: '650000'
    },
    {
      name: '双河市',
      id: '659007',
      parentid: '650000'
    },
    {
      name: '可克达拉市',
      id: '659008',
      parentid: '650000'
    },
    {
      name: '昆玉市',
      id: '659009',
      parentid: '650000'
    },
    {
      name: '胡杨河市',
      id: '659010',
      parentid: '650000'
    },
    {
      name: '台北市',
      id: '710100',
      parentid: '710000'
    },
    {
      name: '基隆市',
      id: '710200',
      parentid: '710000'
    },
    {
      name: '新北市',
      id: '710300',
      parentid: '710000'
    },
    {
      name: '连江县',
      id: '710400',
      parentid: '710000'
    },
    {
      name: '宜兰县',
      id: '710500',
      parentid: '710000'
    },
    {
      name: '新竹市',
      id: '710600',
      parentid: '710000'
    },
    {
      name: '新竹县',
      id: '710700',
      parentid: '710000'
    },
    {
      name: '桃园市',
      id: '710800',
      parentid: '710000'
    },
    {
      name: '苗栗县',
      id: '710900',
      parentid: '710000'
    },
    {
      name: '台中市',
      id: '711000',
      parentid: '710000'
    },
    {
      name: '彰化县',
      id: '711100',
      parentid: '710000'
    },
    {
      name: '南投县',
      id: '711200',
      parentid: '710000'
    },
    {
      name: '嘉义市',
      id: '711300',
      parentid: '710000'
    },
    {
      name: '嘉义县',
      id: '711400',
      parentid: '710000'
    },
    {
      name: '云林县',
      id: '711500',
      parentid: '710000'
    },
    {
      name: '台南市',
      id: '711600',
      parentid: '710000'
    },
    {
      name: '高雄市',
      id: '711700',
      parentid: '710000'
    },
    {
      name: '南海岛',
      id: '711800',
      parentid: '710000'
    },
    {
      name: '澎湖县',
      id: '711900',
      parentid: '710000'
    },
    {
      name: '金门县',
      id: '712000',
      parentid: '710000'
    },
    {
      name: '屏东县',
      id: '712100',
      parentid: '710000'
    },
    {
      name: '台东县',
      id: '712200',
      parentid: '710000'
    },
    {
      name: '花莲县',
      id: '712300',
      parentid: '710000'
    }
  ]
}
