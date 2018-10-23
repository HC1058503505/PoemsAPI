const express = require('express')
const router = express.Router()
const database = require('../../tools/database')

var query = {}
var project = {}
var sort = {'poem_note' : -1}


/**
 * @api {get} /poems/page/:page/limit/:limit 古诗分页列表
 * @apiSampleRequest https://houcong.win:18081/poems/page/:page/limit/:limit
 * @apiDescription 古诗分页列表
 * @apiName 古诗分页列表
 * @apiGroup Poems
 * @apiParam {Int} page 页数
 * @apiParam {Int} limit 每页的数据个数
 * @apiSuccessExample {json} Success-Response:
 * [
 *   {
 *   	_id: "5bbeacfb1ae43c72071cb1d7",
 *   	poem_id: "70635e06d119",
 *   	poem_content: "落日无情最有情，遍催万树暮蝉鸣。\n听来咫尺无寻处，寻到旁边却不声。",
 *   	poem_note: [{
 *   		extension_subs: [{
 *   				extension_sub_title: "译文",
 *   				extension_sub_content: "（题目）初秋在园子里散步\n夕阳看似无情，其实最有情，\n园里树上的蝉，正趁着太阳落下的短暂时间，拼命的高声歌唱，园子里一片蝉叫声。\n蝉的叫声好像就在身边，可是你却无法找到他们，\n因为，当你找到它跟前的时候，它好像知道你来了，鸣叫声立即停止了。"
 *   			},
 *   			{
 *   				extension_sub_title: "注释",
 *   				extension_sub_content: "圃：种植菜蔬、花草、瓜果的园子。行圃，即指在园子里散步。\n咫尺：周制八寸为咫，十寸为尺。形容距离很近。"
 *   			}
 *   		],
 *   		extension_title: "译文及注释"
 *   	}],
 *   	poem_dynasty: "宋代",
 *   	poem_title: "初秋行圃",
 *   	poem_appreciate: [{
 *   		extension_subs: [{
 *   			extension_sub_title: "",
 *   			extension_sub_content: "这是以田园生活为题材的古诗。它以描写蝉为目的，诗人杨万里写落日催暮蝉，蝉鸣声此起彼伏的情景，也写了闻蝉寻声，蝉儿闭口的情形，整首诗通俗易懂、真切传神、趣味横生。虽是即景写景，却亦具有一番清新别致的情趣。"
 *   		}],
 *   		extension_title: "赏析"
 *   	}],
 *   	poem_author: "杨万里",
 *   	poem_tags: "田园|生活|动物"
 *   },
 *   .
 *   .
 *   .
 * ]
 * @apiVersion 1.0.0
 */
router.get('/page/:page/limit/:limit',function (req,res) {
	// body...
	let pageNum = parseInt(req.params.page)
	let limitnum = parseInt(req.params.limit)

	if (isNaN(pageNum)) {
		pageNum = 0
	}

	if (isNaN(limitnum)) {
		limitnum = 10
	}
	
	database.database('poems',query, project, sort ,req, res, pageNum, limitnum)
})

/**
 * @api {get} /poems/id/:poem_id 根据id查询诗词
 * @apiSampleRequest https://houcong.win:18081/poems/id/:poem_id
 * @apiDescription 根据id查询诗词
 * @apiName 根据id查询诗词
 * @apiGroup Poems
 * @apiParam {String} poem_id 诗词的id
 * @apiSuccessExample {json} Success-Response:
 * {
 *  	_id: "5bbeacfb1ae43c72071cb10b",
 *  	poem_id: "bd74c9181f74",
 *  	poem_content: "只得流霞酒一杯，空中箫鼓几时回。\n武夷洞里生毛竹，老尽曾孙更不来。",
 *  	poem_note: [{
 *  		extension_subs: [{
 *  				extension_sub_title: "译文",
 *  				extension_sub_content: "（被称为曾孙）的众乡人只得到仙人们赏赐的一杯流霞仙酒，今天所听到的空中箫鼓声不知道以后什么时候再能听到。\n武夷洞里长满了很多有毒的毛竹，那些被称为曾孙的乡人们纷纷老去，再也没来。"
 *  			},
 *  			{
 *  				extension_sub_title: "注释",
 *  				extension_sub_content: "武夷山：李商隐在这首诗中，典故用的太多，读起来似乎觉得云里雾里。这是李商隐的习惯，他的很多诗中都是如此。这首诗典故中，神仙武夷山君被当地的少年怠慢，居然生气，肚量何其狭窄，为拒乡人求访竟以毛竹作机关，中者成疾，心肠何其歹毒。这样的神仙令人生厌，避之唯恐不及还求他作甚？\n流霞酒一杯：流霞酒是传说中的仙酒。出自东汉·王充《论衡·道虚》：“（项曼都）曰：‘有仙人数人，将我上天，离月数里而止……口饥欲食，仙人辄饮我以流霞一杯，每饮一杯，数月不饥。’”\n空中箫鼓：出自中唐时期的笔记小说《诸山记》：“武夷山神号武夷君，秦始皇二年，一日语村人曰：‘汝等以八月十五日会山顶。’是日村人毕集，……闻空中人声，不见其形。须臾乐响，亦但见乐器，不见其人。”\n生毛竹：出自武夷山神话传说： “武夷君因少年慢之，一夕山心悉生毛竹如刺，中者成疾，人莫敢犯，遂不与村落往来，蹊径遂绝。”\n曾孙：曾孙是神仙对众乡人的称呼，因为神仙的年龄小者几百岁，大者上千岁，所以这样称呼。这同样也出自武夷山神话传说“幔亭招宴”：相传秦始皇二年八月十五日，武夷君与皇太姥、魏王子骞等，于幔亭峰顶设彩屋、幔亭数百间，大会乡人。应召男女二千余人，沿着跨空虹桥，鱼贯而上。众乡人听见空中赞礼人称他们为“曾孙”，并命按男女分东西列坐。亭之东幄内奏“宾云左仙”之曲，西幄内奏“宾云右仙”之曲。接着饮酒，数巡之后，又命歌师彭令昭唱“人间可哀”之曲。歌罢，彩云四合。又听空中赞礼人说：曾孙可告辞回去。乡人下了山，忽然风雨暴至，虹桥飞断。回顾山顶岑寂，葱翠峭拔如初。“生毛竹”、“曾孙”这两则神话传说，宋人祝穆在《武夷山记》里均有记载。"
 *  			}
 *  		],
 *  		extension_title: "译文及注释"
 *  	}],
 *  	poem_dynasty: "唐代",
 *  	poem_title: "武夷山",
 *  	poem_appreciate: [],
 *  	poem_author: "李商隐",
 *  	poem_tags: "写山"
 * }
 * @apiVersion 1.0.0
 */
router.get('/id/:poem_id',function (req, res) {
	// body...
	let poem_id = req.params.poem_id
	query = {
		'poem_id' : poem_id
	}
	database.database('poems', query, project, sort, req, res, 0, 0)
})


/**
 * @api {get} /poems/author/:poem_author/page/:page/limit/:limit 根据朝作者查询诗词
 * @apiSampleRequest https://houcong.win:18081/poems/author/:poem_author/page/:page/limit/:limit
 * @apiDescription 根据朝作者查询诗词
 * @apiName 根据朝作者查询诗词
 * @apiGroup Poems
 * @apiParam {String} poem_author 诗词的作者
 * @apiParam {Int} page 页数
 * @apiParam {Int} limit 每页的数据个数
 * @apiSuccessExample {json} Success-Response:
 * [
 *       {
 *      	_id: "5bbeacfb1ae43c72071c94c2",
 *      	poem_id: "680aca37b10c",
 *      	poem_content: "鹦鹉来过吴江水，江上洲传鹦鹉名。\n鹦鹉西飞陇山去，芳洲之树何青青。\n烟开兰叶香风暖，岸夹桃花锦浪生。\n迁客此时徒极目，长洲孤月向谁明。",
 *      	poem_note: [{
 *      		extension_subs: [{
 *      				extension_sub_title: "译文",
 *      				extension_sub_content: "鹦鹉曾经来到吴江的岸边，江中的小洲传着鹦鹉的美名。\n鹦鹉已向西而飞回到陇山，鹦鹉洲上花香四溢草木青青。\n春风和暖烟云缭绕飘来阵阵兰香，两岸桃花落入江中形成层层锦浪。\n被迁谪的旅人此时只有徒然远望，长洲上孤月朗照究竟是为谁而明？"
 *      			},
 *      			{
 *      				extension_sub_title: "注释",
 *      				extension_sub_content: "鹦鹉洲：武昌西南长江中的一个小洲。祢衡曾作《鹦鹉赋》于此，故称。\n吴江：指流经武昌一带的长江。因三国时属吴国，故称吴江。\n陇山：又名陇坻，山名，在今陕西陇县西北。相传鹦鹉出产在这里。\n芳洲：香草丛生的水中陆地。这里指鹦鹉洲。\n锦浪：形容江浪像锦绣一样美丽。两句意为：春风吹开了烟雾，送来浓郁的兰香；两岸桃花盛开，映照得江浪绚丽如锦。\n迁客：指被流放过的人。这里是诗人自称。\n长洲：指鹦鹉洲。向谁明：意即照何人。"
 *      			}
 *      		],
 *      		extension_title: "译文及注释"
 *      	}],
 *      	poem_dynasty: "唐代",
 *      	poem_title: "鹦鹉洲",
 *      	poem_appreciate: [{
 *      			extension_subs: [{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "诗写鹦鹉洲，开篇便从鹦鹉入手，“鹦鹉”二字一出，便顿觉颇难收束，只好一气贯注，旋转而下，到了第四句才略略顿住，然而诗已过了半篇。鹦鹉洲是江夏的名胜，原在湖北武汉市武昌城外江中。相传由东汉末年祢衡在黄祖的长子黄射大会宾客时，即席挥笔写就一篇“锵锵振金玉，句句欲飞鸣”（李白《望鹦鹉洲怀祢衡》）的《鹦鹉赋》而得名。后祢衡被黄祖杀害，亦葬于洲上。历代诗人临江夏，大都描写鹦鹉洲。此洲在明朝末年逐渐沉没。现在汉阳拦江堤外的鹦鹉洲，系清乾隆年间新淤的一洲，曾名“补得洲”，嘉庆年间改名鹦鹉洲。这鹦鹉洲是因为祢衡的一篇《鹦鹉赋》而得名，并不是因鹦鹉来过而得名。那么李白诗开篇的“鹦鹉”看似实写，其实乃是代指祢衡，“江上洲传鹦鹉名”，主要是指《鹦鹉赋》，而不是专指这里来过鹦鹉，至少是一语双关，虚实并用。接下第三句还是一语双关，它化用祢衡《鹦鹉赋》中“命虞人于陇坻，诏伯益于流沙。跨昆仑而播弋，冠云霓而张罗”的句子，说鹦鹉已西飞而去。相传鹦鹉生长于陕西、甘肃两省交界处的陇山一带，如今，洲上已不见鹦鹉，那么，定是飞回陇山去了。言外之意是说祢衡在这里被杀。因此，诗人感到非常的惋惜：鹦鹉曾来过这里，为此留下了一个美丽的名字，然而又西飞而去。鹦鹉飞走了，不在了，可那芳洲之上还碧树青青。情韵幽深，余味无穷，表现了诗人对祢衡的无限怀念。这四句诗气势流转自如，而又一唱三叹，绝不是对崔颢《黄鹤楼》的简单摹仿，它是诗人的艺术创造。其中字面的点染，双关语的运用，词语的重叠出现，设问的语重心长，同崔诗比较，既有异曲同工之妙，又有别具匠心之处。"
 *      				},
 *      				{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "五六两句诗意开始转折，转的过程中，又同第四句藕断丝连，接“何青青”三字，生动地描绘了鹦鹉洲上明媚的春光：远远望去，鹦鹉洲上，花团锦簇，水气缭绕，花之浓艳似云蒸霞蔚，轻烟笼罩；水之蒸腾成雾气上升，迷濛缥缈。烟花水雾，似花似雾，即花即雾，彼此迷离一片。一阵春风拂过，鹦鹉洲上如帷幕轻轻拉开，淡烟薄雾逐渐散去，可见洲上那嫩绿的兰叶、葳蕤纷披，在微风中摇曳生姿，融融丽日、阵阵馨香，令人陶醉而感受到春天的温暖。正是阳春三月的季节，江洲两岸的树树桃花临水盛开，如同朵朵红云，互相簇拥着、升腾着，像是被江岸和洲岸夹束在一起似的。微风中，桃花落英缤纷。飘荡在倒映着枝枝繁花的水面上。水中的，水上的，倒映的，飘落的，艳丽的桃花将晶莹明澈的江水染得像一匹绚烂夺目的锦缎，随着江波的起伏，一浪一浪地涌向岸边。然而，景色尽管明丽，却丝毫撩拨不起诗人的欢快之情，他依然沉浸在孤寂和悲苦之中。此时，诗人毕竟还是一位被流放过的“迁客”，眼前这一切生机勃勃的良辰美景跟他内心的索寞痛苦恰恰形成了强烈的对比。大好时光，烟花美景，都只是徒有。自己一生流离困顿，晚年蒙冤遭流放，更趋穷困，尽管内心还存在一种奋起搏击的暮年壮志，但终不免落花流水，悲愁难驱。面对如此芳洲，此时此地只不过是徒然纵目而已。“烟开兰叶香风暖，岸夹桃花锦浪生”的景色并没有引起他的注意，他所注望的仍是“鹦鹉”，是那位和自己有着相似遭遇的祢衡。据陆游《入蜀记》载：“鹦鹉洲上有茂林神祠，远望如小山，洲盖祢正平被杀处。”诗人问道：如今，祢衡长眠地下，而长洲之上那一轮徘徊的孤月，又将清辉投射给谁呢？"
 *      				},
 *      				{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "诗写鹦鹉洲，实际上是在吊古伤今，怀祢衡而抒发自己的沉痛感慨。诗人晚年的不幸遭遇和处境，会使他自然地将自己和祢衡联系起来，况且他平生倾慕祢衡，常以祢衡自比：“误学书剑，薄游人间。紫薇九重，碧山万里。有才无命，甘于后时。刘表不用于祢衡，暂来江夏；贺循喜逢于张翰，且乐船中。”（《暮春江夏送张祖监丞之东都序》）好友杜甫也曾以“处士祢衡俊，诸生原宪贫”（《寄李十二白二十韵》）的诗句来称美他的才华。他在诗中也曾多次写到祢衡：“顾惭祢处士，虚对鹦鹉洲。”（《经乱离后天恩流夜郎忆旧游书怀赠江夏韦太守良宰》）“愿扫鹦鹉洲，与君醉百场。”（《自汉阳病酒归寄王明府》）并有一首《望鹦鹉洲怀祢衡》。《望鹦鹉洲怀祢衡》与《鹦鹉洲》两首诗的思想感情是一致的。而《望鹦鹉洲怀祢衡》表现得比较平直、明朗；《鹦鹉洲》则深沉、含蓄。"
 *      				},
 *      				{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "前人评诗认为李白这首诗同另一首《登金陵凤凰台》是与崔颢《黄鹤楼》争高下的。清人方东树在《昭昧詹言》中曾对此说过这样一段话：崔颢《黄鹤楼》，千古擅名之作。只是以文笔行之，一气转折。五六虽断写景，而气亦直下喷溢。收亦然，所以奇贵。太白《鹦鹉洲》格律工力悉敌，风格逼肖。未尝有意学之而自似。方氏所论还是比较切合实际。艺术不乏相互影响，但无论如何，像《鹦鹉洲》这样感情深沉，意境浑融的作品断不会是摹仿所能得到的。"
 *      				},
 *      				{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "李白这首诗属于拗体七律，它前两联不合律，后两联合律。汪师韩在《诗学纂闻》中曾说：李白《鹦鹉洲》一章乃庚韵而押青字，此诗《文粹》编入七古，后人编入七律，其体亦可古可今，要皆出韵也。"
 *      				},
 *      				{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "正是它未完全合律，前人曾将此诗看作七古：“李白《鹦鹉洲》诗，调既急迅，而多复字，兼离唐韵，当是七言古风耳。”（毛先舒《辩坻诗》）李白现存七律共十二首，且大都如此，同整个创作比较，七律诗比较少。关于这个问题的原因，前人多有论述，或认为李白不善和不愿作七律：“李太白不作七言律……古人立名之意甚坚，每不肯以其拙示人。”（贺贻孙《诗筏》）“他所以只有很少几首律诗，不是不善写，而是不愿写。”（王运熙、李宝均《李白》）“他是不耐烦在形式上和字句上下推敲工夫的。”（王瑶《李白》）或认为李白反对作七律：“太白之论曰：‘寄兴深微，五言不如四言，七言又其靡也’……所谓七言之靡，殆专指七律言耳。故其七律不工。”（翁方纲《石洲诗话》）这种种评价都缺乏公允，实际情况应该说是当时七律的发展现状决定的。李白所处的时代，七律尚未定型，因此创作难免不合律且数量少，不仅李白，其他人也多是如此。赵翼在《瓯北诗话》中对此曾有一段中肯的论述："
 *      				},
 *      				{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "就有唐而论，其始也，尚多习用古诗，不乐束缚于规行矩步中，即用律亦多五言，而七言犹少，七言亦多绝句，而律诗犹少。故李太白集七律仅三首，孟浩然集七律仅二首，尚不专以此见长也。自高、岑、王、杜等《早朝》诸作，敲金戛玉，研练精切。杜寄高、岑诗，所谓“遥知属对忙”，可见是时求工律体也。格式既定，更如一朝令甲，莫不就其范围。然犹多写景，而未及于指事言情，引用典故。少陵以穷愁寂寞之身，藉诗遣日，于是七律益尽其变，不惟写景，兼复言情，不惟言情，兼复使典，七律之蹊径，至是益大开。其后刘长卿、李义山、温飞卿诸人，愈工雕琢，尽其才于五十六字中，而七律遂为高下通行之具，如日用饮食之不可离矣。"
 *      				},
 *      				{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "由此可知，七律的成熟是在李白之后。这样，《鹦鹉洲》诸作不合律也就很自然了。"
 *      				}
 *      			],
 *      			extension_title: "赏析"
 *      		},
 *      		{
 *      			extension_subs: [{
 *      				extension_sub_title: "",
 *      				extension_sub_content: "此诗当作于唐肃宗上元元年（760年）。当年春天，遇赦的李白经过一冬的巴陵之游又回到了江夏。在这里，诗人览胜访友，一度又恢复了诗酒放诞的豪情逸致。《鹦鹉洲》就写于此时。此诗借描写鹦鹉洲的艳丽春景以及古人祢衡的悲惨遭遇，反衬诗人自己饱经颠沛流离之苦的孤寂心情。"
 *      			}],
 *      			extension_title: "创作背景"
 *      		}
 *      	],
 *      	poem_author: "李白",
 *      	poem_tags: "地名|抒情|流放"
 *      },
 *      .
 *      .
 *      .
 * ]
 * @apiVersion 1.0.0
 */
router.get('/author/:poem_author/page/:page/limit/:limit',function (req, res) {
	// body...
	let poem_author = req.params.poem_author
	let pageNum = parseInt(req.params.page)
	let limitnum = parseInt(req.params.limit)

	if (isNaN(pageNum)) {
		pageNum = 0
	}

	if (isNaN(limitnum)) {
		limitnum = 10
	}

    query = {
		'poem_author' : {
			$regex : poem_author
		}
	}
	database.database('poems', query, project, sort, req, res, pageNum, limitnum)
})


/**
 * @api {get} /poems/dynasty/:dynasty/page/:page/limit/:limit 根据朝代查询诗词
 * @apiSampleRequest https://houcong.win:18081/poems/dynasty/:dynasty/page/:page/limit/:limit
 * @apiDescription 根据朝代查询诗词
 * @apiName 根据朝代查询诗词
 * @apiGroup Poems
 * @apiParam {String} dynasty 诗词所在的朝代
 * @apiParam {Int} page 页数
 * @apiParam {Int} limit 每页的数据个数
 * @apiSuccessExample {json} Success-Response:
 * [
 *      {
 *      	_id: "5bbeacfb1ae43c72071cc34a",
 *      	poem_id: "e4f3664b14eb",
 *      	poem_content: "汀洲无浪复无烟，楚客相思益渺然。\n汉口夕阳斜渡鸟，洞庭秋水远连天。\n孤城背岭寒吹角，独树临江夜泊船。\n贾谊上书忧汉室，长沙谪去古今怜。",
 *      	poem_note: [{
 *      		extension_subs: [{
 *      				extension_sub_title: "韵译",
 *      				extension_sub_content: "鹦鹉洲在长江中浮沉，无浪也无烟；\n我这楚客思念中丞，心绪更加渺远。\n汉口斜映着夕阳，飞鸟都纷纷归巢；\n洞庭湖的秋水，烟波浩渺远接蓝天。\n汉阳城后的山岭，传来悲凉的号角；\n滨临江边的独树旁，夜里泊着孤船。\n当年贾谊上书文帝，全是忧心汉室；\n他却被贬谪居长沙，古今谁不衰怜！"
 *      			},
 *      			{
 *      				extension_sub_title: "注解",
 *      				extension_sub_content: "汀洲：水中可居之地，指鹦鹉洲。\n楚客：指到此的旅人。夏口古属楚国境。\n孤城：指汉阳城，城后有山。\n角：古代军队中的一种吹乐器。"
 *      			}
 *      		],
 *      		extension_title: "译文及注释"
 *      	}],
 *      	poem_dynasty: "唐代",
 *      	poem_title: "自夏口至鹦鹉洲夕望岳阳寄源中丞",
 *      	poem_appreciate: [{
 *      			extension_subs: [{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "该诗当是诗人在至德（唐肃宗年号，公元756年—758年）间任鄂州转运留后，出巡到夏口一带时所作。"
 *      				},
 *      				{
 *      					extension_sub_title: "",
 *      					extension_sub_content: "该诗是遭贬后触景感怀之作。诗中对被贬于岳阳的源中丞，表示怀念和同情，也是借怜贾谊贬谪长沙，以喻自己的遭贬谪。前六句主要是描绘江乡浩渺静谧之景。首联写诗人为身边景物所触动，而想到贬于洞庭湖畔岳阳城友人，通过写江上浪烟来寄托对友人的思念之情。中间两联所写，都是诗人由夏口至鹦鹉洲一路的所见所闻。“夕阳度斜鸟”写时间已晚，无法到达；“秋水远连关”写地域遥远，只能相思，不得相过。最后两句“贾谊上书忧汉室，长沙谪去古今怜”为劝慰元中丞语，忧愤之语倾泻而出，以同情友人在政治上遭受打击的境遇作结，也是作者自己人生遭际的写照。全诗以写景为主，但处处切题，以“汀洲”切鹦鹉洲，以“汉口”切夏口，以“孤城”切岳阳。最后即景生情，抒发被贬南巴的感慨，揭示出向源中丞寄诗的意图。"
 *      				}
 *      			],
 *      			extension_title: "鉴赏"
 *      		},
 *      		{
 *      			extension_subs: [{
 *      				extension_sub_title: "",
 *      				extension_sub_content: "该诗当是诗人在至德（唐肃宗年号，756—758）间任鄂州转运留后，出巡到夏口一带时所作。作者自夏口乘船出发，夕阳西下时便抵达鹦鹉洲，触景生情，写了这首诗，寄给远在洞庭湖畔的元中丞。"
 *      			}],
 *      			extension_title: "创作背景"
 *      		}
 *      	],
 *      	poem_author: "刘长卿",
 *      	poem_tags: "唐诗三百首|贬谪|触景感怀"
 *      },
 *      .
 *      .
 *      .
 * ]
 *
 * @apiVersion 1.0.0
 */
router.get('/dynasty/:dynasty/page/:page/limit/:limit',function (req, res) {
	// body...
	let poem_dynasty = req.params.dynasty.substring(0,1)
	let pageNum = parseInt(req.params.page)
	let limitnum = parseInt(req.params.limit)

	if (isNaN(pageNum)) {
		pageNum = 0
	}

	if (isNaN(limitnum)) {
		limitnum = 10
	}

 	query = { 
		'poem_dynasty' : {
			$regex : poem_dynasty
		}
	}
	database.database('poems', query, project, sort, req, res, pageNum, limitnum)
})

/**
 * @api {get} /poems/title/:poem_title/page/:page/limit/:limit 根据题目名字查询诗词
 * @apiSampleRequest https://houcong.win:18081/poems/title/:poem_title/page/:page/limit/:limit
 * @apiDescription 根据题目名字查询诗词
 * @apiName 根据题目名字查询诗词
 * @apiGroup Poems
 * @apiParam {String} poem_title 诗词的题目
 * @apiParam {Int} page 页数
 * @apiParam {Int} limit 每页的数据个数
 * @apiSuccessExample {json} Success-Response:
 * [{
 * 		_id: "5bbeacfb1ae43c72071c925e",
 * 		poem_id: "0f81015a040c",
 * 		poem_content: "朝辞白帝彩云间，千里江陵一日还。\n两岸猿声啼不住，轻舟已过万重山。",
 * 		poem_note: [{
 * 			extension_subs: [{
 * 					extension_sub_title: "译文",
 * 					extension_sub_content: "清晨，朝霞满天，我就要踏上归程。从江上往高处看，可以看见白帝城彩云缭绕，如在云间，景色绚丽！千里之遥的江陵，一天之间就已经到达。\n两岸猿猴的啼声不断，回荡不绝。猿猴的啼声还回荡在耳边时，轻快的小船已驶过连绵不绝的万重山峦。"
 * 				},
 * 				{
 * 					extension_sub_title: "译文二",
 * 					extension_sub_content: "清晨，我告别高入云霄的白帝城江陵远在千里，船行只一日时间。\n两岸猿声，还在耳边不停地啼叫不知不觉，轻舟已穿过万重青山。"
 * 				},
 * 				{
 * 					extension_sub_title: "注释",
 * 					extension_sub_content: "发：启程。白帝城：故址在今重庆市奉节县白帝山上。杨齐贤注：“白帝城，公孙述所筑。初，公孙述至鱼复，有白龙出井中，自以承汉土运，故称白帝，改鱼复为白帝城。”王琦注：“白帝城，在夔州奉节县，与巫山相近。所谓彩云，正指巫山之云也。”\n朝：早晨。辞：告别。彩云间：因白帝城在白帝山上，地势高耸，从山下江中仰望，仿佛耸入云间。\n江陵：今湖北荆州市。从白帝城到江陵约一千二百里，其间包括七百里三峡。郦道元《三峡》：“自三峡七百里中，两岸连山，略无阙处。重岩叠障，隐天蔽日，自非亭午时分，不见曦月。至于夏水襄陵，沿溯（或泝）阻绝。或王命急宣，有时朝发白帝，暮到江陵，其间千二百时里，虽乘奔御风，不以疾也。春冬之时，则素湍绿潭，回清倒影。绝巘（或巚）多生怪柏，悬泉瀑布，飞漱其间。清荣峻茂，良多趣味。每至晴初霜旦，林寒涧肃，常有高猿长啸，属引凄异。空谷传响，哀啭久绝。故渔者歌曰：‘巴东三峡巫峡长，猿鸣三声泪沾裳。’”还：归；返回。\n猿：猿猴。啼：鸣、叫。住：停息。\n万重山：层层叠叠的山，形容有许多。"
 * 				}
 * 			],
 * 			extension_title: "译文及注释"
 * 		}],
 * 		poem_dynasty: "唐代",
 * 		poem_title: "早发白帝城 / 白帝下江陵",
 * 		poem_appreciate: [{
 * 				extension_subs: [{
 * 					extension_sub_title: "",
 * 					extension_sub_content: "唐肃宗乾元二年（759年）春天，李白因永王李璘案，流放夜郎，取道四川赶赴被贬谪的地方。行至白帝城的时候，忽然收到赦免的消息，惊喜交加，随即乘舟东下江陵。此诗即回舟抵江陵时所作，所以诗题一作《下江陵》。"
 * 				}],
 * 				extension_title: "创作背景"
 * 			},
 * 			{
 * 				extension_subs: [{
 * 						extension_sub_title: "",
 * 						extension_sub_content: "首句“彩云间”三字，描写白帝城地势之高，为全篇描写下水船走得快这一动态蓄势。“彩云间”的“间”字当作隔断之意，诗人回望云霞之上的白帝城，以前的种种恍如隔世。一说形容白帝城之高，水行船速全在落差。如果不写白帝城之高，则无法体现出长江上下游之间斜度差距之大。白帝城地势高入云霄，于是下面几句中写舟行的迅捷、行期的短暂、耳（猿声）目（万重山）的不暇迎送，才一一有着落。“彩云间”也是写早晨景色，显示出从晦暝转为光明的大好气象，而诗人便在这曙光初灿的时刻，怀着兴奋的心情匆匆告别白帝城。"
 * 					},
 * 					{
 * 						extension_sub_title: "",
 * 						extension_sub_content: "第二句的“千里”和“一日”，以空间之远与时间之短作悬殊对比。这里，巧妙的地方在于那个“还”字上。“还”，归来的意思。它不仅表现出诗人“一日”而行“千里”的痛快，也隐隐透露出遇赦的喜悦。江陵本非李白的家乡，而“还”字却亲切得如同回乡一样。一个“还”字，暗处传神，值得读者细细玩味。"
 * 					},
 * 					{
 * 						extension_sub_title: "",
 * 						extension_sub_content: "第三句的境界更为神妙。古时长江三峡，“常有高猿长啸”。诗人说“啼不住”，是因为他乘坐飞快的轻舟行驶在长江上，耳听两岸的猿啼声，又看见两旁的山影，猿啼声不止一处，山影也不止一处，由于舟行人速，使得啼声和山影在耳目之间成为“浑然一片”，这就是李白在出峡时为猿声山影所感受的情景。身在这如脱弦之箭、顺流直下的船上，诗人感到十分畅快和兴奋。清代桂馥称赞：“妙在第三句，能使通首精神飞越。”（《札朴》）"
 * 					},
 * 					{
 * 						extension_sub_title: "",
 * 						extension_sub_content: "瞬息之间，“轻舟”已过“万重山”。为了形容船快，诗人除了用猿声山影来烘托，还给船的本身添上了一个“轻”字。直说船快，那便显得笨拙；而这个“轻”字，却别有一番意蕴。三峡水急滩险，诗人溯流而上时，不仅觉得船重，而且心情更为滞重，“三朝上黄牛，三暮行太迟。三朝又三暮，不觉鬓成丝”（《上三峡》）。如今顺流而下，行船轻如无物，船的快速读者可想而知。而“危乎高哉”的“万重山”一过，轻舟进入坦途，诗人历尽艰险、进入康庄旅途的快感，也自然而然地表现出来了。这最后两句，既是写景，又是比兴，既是个人心情的表达，又是人生经验的总结，因物兴感，精妙无伦。"
 * 					},
 * 					{
 * 						extension_sub_title: "",
 * 						extension_sub_content: "全诗给人一种锋棱挺拔、空灵飞动之感。然而只看这首诗的气势的豪爽，笔姿的骏利，还不能完备地理解全诗。全诗洋溢的是诗人经过艰难岁月之后突然迸发的一种激情，所以在雄峻和迅疾中，又有豪情和欢悦。快船快意，给读者留下了广阔的想象余地。为了表达畅快的心情，诗人还特意用上平“删”韵的“间”、“还”、“山”来作韵脚，使全诗显得格外悠扬、轻快，回味悠长。"
 * 					}
 * 				],
 * 				extension_title: "赏析"
 * 			}
 * 		],
 * 		poem_author: "李白",
 * 		poem_tags: "唐诗三百首|写山|长江|地名|喜悦|早教古诗100首"
 * 	},
 * 	{
 * 		_id: "5bbeacfd1ae43c72071e3c61",
 * 		poem_id: "357454a8ff16",
 * 		poem_content: "谪仙东下入睢间，一叶扁舟日日还。闻说冲涛千尺浪，两江极目尽皆山。",
 * 		poem_note: [],
 * 		poem_dynasty: "明代",
 * 		poem_title: "咏李白早发白帝城 其二",
 * 		poem_appreciate: [],
 * 		poem_author: "朱元璋",
 * 		poem_tags: ""
 * 	},
 * 	{
 * 		_id: "5bbeacfd1ae43c72071e3c62",
 * 		poem_id: "53a360ba883a",
 * 		poem_content: "白帝城高万叠间，江云朝出暮犹还。信知千古英雄地，虽险应须德作山。",
 * 		poem_note: [],
 * 		poem_dynasty: "明代",
 * 		poem_title: "咏李白早发白帝城 其一",
 * 		poem_appreciate: [],
 * 		poem_author: "朱元璋",
 * 		poem_tags: ""
 * 	}
 * ]
 * @apiVersion 1.0.0
 */
router.get('/title/:poem_title/page/:page/limit/:limit',function (req, res) {
	// body...
	let poem_title = req.params.poem_title
	let pageNum = parseInt(req.params.page)
	let limitnum = parseInt(req.params.limit)

	if (isNaN(pageNum)) {
		pageNum = 0
	}

	if (isNaN(limitnum)) {
		limitnum = 10
	}

	query = {
		'poem_title' : {
			$regex : poem_title
		}
	}
	database.database('poems', query, project, sort, req, res, pageNum, limitnum)
})


/**
 * @api {get} /poems/tag/:poem_tag/page/:page/limit/:limit 根据朝tag查询诗词
 * @apiSampleRequest https://houcong.win:18081/poems/tag/:poem_tag/page/:page/limit/:limit
 * @apiDescription 根据朝tag查询诗词
 * @apiName 根据朝tag查询诗词
 * @apiGroup Poems
 * @apiParam {String} poem_tag 诗词的tag
 * @apiParam {Int} page 页数s
 * @apiParam {Int} limit 每页的数据个数
 * @apiSuccessExample {json} Success-Response:
 *[
 *	{
 *  	_id: "5bbeacfb1ae43c72071cc4e2",
 *  	poem_id: "f160ccf4d92a",
 *  	poem_content: "碧丛丛，高插天，大江翻澜神曳烟。\n楚魂寻梦风飔然，晓风飞雨生苔钱。\n瑶姬一去一千年，丁香筇竹啼老猿。\n古祠近月蟾桂寒，椒花坠红湿云间。",
 *  	poem_note: [{
 *  		extension_subs: [{
 *  				extension_sub_title: "译文",
 *  				extension_sub_content: "碧绿簇聚的巫山群峰高插云天。长江翻波浪，神女长裙拖带着云烟。\n楚王思念梦中神女，飕飕起凉风，天亮后只见风吹细雨，苔藓处处生。\n神女瑶姬一去千年杳无踪影，丁香丛中筇竹林里不时传出老猿的啼声。\n古祠接近月宫，蟾蜍桂树，高险阴冷，山间的椒子儿坠落，把云朵染红。"
 *  			},
 *  			{
 *  				extension_sub_title: "注释",
 *  				extension_sub_content: "《巫山高》：本为乐府古题，是《汉铙歌十八曲》之一。巫山：在今重庆巫山县东，山如巫字形，故名。\n丛丛：群峰簇聚的样子。\n大江：指长江。神：指巫山神女。翻澜（fān lán） ：波澜翻卷。曳（yè）烟：指神女在烟云中飞行，长裙拖带着云彩。\n楚魂寻梦：指楚襄王（一说楚怀王）梦遇巫山神女的故事，见宋玉《神女赋》。颸（sī）然：凉飕飕。\n苔钱：苔藓，圆如铜钱，故称。\n瑶姬：巫山神女名。相传为赤帝之女，死后葬于巫山之南，楚怀王梦见与其相遇，自称是巫山之女。见《襄阳耆旧传》。\n丁香：即紫丁香。\n筇（qióng）竹：又名邛竹，古邛国（在今四川西昌市东南）所产之竹，节长心实。\n古祠：指巫山神女祠，在巫山的对面。近月：极言山峰上的古祠位置高险。蟾桂：指传说中的月宫里的蟾蜍和桂树。\n椒：花椒，灌木，子实紫红，开黄绿色小花。坠红：此处椒花实指花椒的子实，故曰“坠红”。湿云：湿度大的云。"
 *  			}
 *  		],
 *  		extension_title: "译文及注释"
 *  	}],
 *  	poem_dynasty: "唐代",
 *  	poem_title: "巫山高",
 *  	poem_appreciate: [{
 *  			extension_subs: [{
 *  				extension_sub_title: "",
 *  				extension_sub_content: "《巫山高》原为汉代鼓吹铙歌十八曲之一，后成为乐府旧题。南北朝以来，有诸多以《巫山高》命题的诗作，其情旨大都围绕巫山朝云暮雨的山色和楚襄王梦遇神女的故事。李贺的这首《巫山高》同样未脱此境。据史料记载，李贺一生未曾到过巫山，此诗是他的奇想之作。"
 *  			}],
 *  			extension_title: "创作背景"
 *  		},
 *  		{
 *  			extension_subs: [{
 *  					extension_sub_title: "",
 *  					extension_sub_content: "全诗是从描写巫山景色着笔，循着巫山神女的典故展开诗思的。"
 *  				},
 *  				{
 *  					extension_sub_title: "",
 *  					extension_sub_content: "诗的首三句，“碧丛丛，高插天，大江翻澜神曳烟”，将巫山十二峰的奇特景观，表现得十分精当，一下子就摄住了读者的注意力，引领大家进入到诗的意境中去。“神曳烟”三字，极妙。这三字，形象描绘巫山闻空滚缥缈、渐移缓行的烟云，它与波澜翻滚、水势迅猛的“大江”，形成动态上的强烈比差；同时，大江、云烟的动态，又与静谖的陡峭山壁，丛碧树木，构成鲜明对比，使全诗的开端显得色彩和谐，层次感强、动静配合，富有诗情画意。如此优美的环境，接容易感发超人们的奇思遐想。“神曳烟”里的“神”字，轻笔一点，便逗引出下文巫山神女构典故来。至此，诗情便从景色描写很自然地转入到优美的传说故事中去。"
 *  				},
 *  				{
 *  					extension_sub_title: "",
 *  					extension_sub_content: "“楚魂寻梦风颸然”以下四句，专写楚王梦寻瑶姬事，诗里的“楚魂寻梦”，即指此事。李贺翻用这则典故，不说巫山神女会见楚王，反过来说楚王的灵魂在飒飒的凉风里去寻求梦中的瑶姬，但是，瑶姬一去已隔千年，巫山之阳再也找不到她的形迹，剩下来的只有在晓凤飞雨里生长的苔藓，丁香翠竹丛中传来的老猿的悲啼声。诗的结尾二句，申足上文诗意。神女不在，古祠尚存。诗云“椒花坠红”，这是因为长吉从未到过蜀地，出于艺术想象，所以误将紫赤色的花椒果实当作花朵，写出“坠红”的诗歌意象。山里湿气重，似乎云也是湿的，故云“湿云”。两旬意谓古祠近月，寒气侵逼，空寂无人，不时有椒花坠落在古祠旁。用空寂的意境收束全篇，有力地突现了“楚魂寻梦”的空幻，暗示了全诗的题旨。"
 *  				},
 *  				{
 *  					extension_sub_title: "",
 *  					extension_sub_content: "揣摩其艺术特色，有三点：一是着力于揭示矛盾，求变求新。作者的这种艺术追求突出地表现在对比手法的运用上。例如开头三句，使山与水相比照：峰峦高耸，岿然不动；江水绵延，翻滚不已。一者静，一者动；一者高，一者远；一者秀丽，一者混沌。于对比中生发出气势来，显得雄高远，开阖动荡。"
 *  				},
 *  				{
 *  					extension_sub_title: "",
 *  					extension_sub_content: "二是重音叠字用得巧妙，丰富了语言的内涵。如开头的“碧丛丛”。中间的“瑶姬一去一千年”，两个“一”字，一虚一实，似乎彼此不相干，其实联系紧密，具有非凡的表现力。“一去”有“去不复返”的意思，而“一千年”则暗示逝者的无情和时间的无情。多情的“楚王”望眼欲穿，却始终不见神女的身影，这就有效地浓化了诗歌的悲剧气氛。"
 *  				},
 *  				{
 *  					extension_sub_title: "",
 *  					extension_sub_content: "三是出奇制胜，用暖色调表现悲凉的景况，很成功。末句“椒花坠红湿云间”，红不仅是暖色，且多用以渲染喜庆场面。这里把它和动词“坠”字、形容词“湿”字相缀连，惨红的颜色和凋残的态势令人触目伤怀，就象堕楼的绿珠引起后人广泛的同情、惋惜和哀伤那样，所有美好的、充满生命力的事物被毁弃，更加剧人们的伤感心情。"
 *  				}
 *  			],
 *  			extension_title: "赏析"
 *  		}
 *  	],
 *  	poem_author: "李贺",
 *  	poem_tags: "写山|写景"
 *  },
 *  .
 *  .
 *  .
 *]
 *
 * @apiVersion 1.0.0
 */
router.get('/tag/:poem_tag/page/:page/limit/:limit',function (req, res) {
	// body...
	let poem_tag = req.params.poem_tag
	let pageNum = parseInt(req.params.page)
	let limitnum = parseInt(req.params.limit)

	if (isNaN(pageNum)) {
		pageNum = 0
	}

	if (isNaN(limitnum)) {
		limitnum = 10
	}

	query = {
		'poem_tags' : {
			$regex : poem_tag
		}
	}
	database.database('poems', query, project, sort,req, res, pageNum, limitnum)
})

router.get('/key/:key/keyid/:keyid/type/:type/isCollection/:isCollection',function(req, res) {
	let type = req.params.type
	let isCollection = Boolean(req.params.isCollection)
	let keyid = req.params.keyid
	let key = req.params.key

	let whereStr = {}
	whereStr[key] = keyid

	let updateStr = {
		$set : {
			'isCollection' : isCollection
		}
	}
	database.collection(type,whereStr,updateStr,req, res, true)
})

router.get('/isCollection/key/:key/keyid/:keyid/type/:type/',function(req, res) {
	let type = req.params.type
	let isCollection = Boolean(req.params.isCollection)
	let keyid = req.params.keyid
	let key = req.params.key

	let whereStr = {}
	whereStr[key] = keyid
	database.collection(type,whereStr,'',req, res, false)
})
module.exports = router;