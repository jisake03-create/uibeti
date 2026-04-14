import React, { useMemo, useState } from 'react'

const personalities = {
  dispatcher: {
    id: 'dispatcher',
    name: '人间调度台',
    tagline: '事情可以乱，但你不能乱。',
    description:
      '你很容易自动进入调度模式。别人还在发呆、抱怨、互相等的时候，你已经开始想谁做什么、先做什么、怎么收尾。你不一定爱当负责人，但环境往往会把你推到那个位置。',
    strengths: ['很会推进事情', '责任感强', '能在混乱里理清结构'],
    risks: ['容易替别人背事', '容易累但不表现出来'],
    advice: '别什么都自己扛，不是每个场都值得你救。',
  },
  accomplice: {
    id: 'accomplice',
    name: '气氛共犯',
    tagline: '痛苦不一定会消失，但可以先一起笑出来。',
    description:
      '你特别会和别人形成共鸣现场。作业太多、pre太密、食堂太难吃、厕所太离谱，这些事情到你这里，通常不会只是个人痛苦，而会变成群体情绪事件。',
    strengths: ['很有活人感', '共情能力强', '能让环境没那么压抑'],
    risks: ['容易被群体情绪裹进去', '容易把自己的累藏在热闹里'],
    advice: '继续发光，但别一直当别人的情绪处理器。',
  },
  cpuFuel: {
    id: 'cpuFuel',
    name: 'CPU燃料包',
    tagline: '你不是天生外向，你是被高压课堂点着了。',
    description:
      '一次次 pre，一轮轮表达，让你逐渐从“我不想说”进化成“行，我来”。你也许本来不是最外放的人，但高压课堂把你训练出了一种强行输出的能力。',
    strengths: ['表达能力成长快', '适应高压场景强', '能在硬着头皮中进化'],
    risks: ['容易长期过载', '外表很会讲，内里其实很累'],
    advice: '不是每次都要超常发挥，有时候讲完就行。',
  },
  observer: {
    id: 'observer',
    name: '漂浮观察员',
    tagline: '你像飘在半空，但什么都看得很清楚。',
    description:
      '你不是最吵的，也不是最先冲出去的，但你对周围的一切都很敏感。你习惯边活边观察，边经历边抽离。',
    strengths: ['感知细腻', '会看人和看场', '不容易被表面现象骗到'],
    risks: ['容易想太多', '容易长期旁观自己生活'],
    advice: '偶尔别只做观察者，有些事先活进去也可以。',
  },
  abstractGen: {
    id: 'abstractGen',
    name: '抽象发电机',
    tagline: '别人是在过大学，你是在给荒诞现实配隐喻。',
    description:
      '你特别擅长把离谱生活翻译成另一套语言。厕所不是厕所，是行为艺术；抢课不是抢课，是循环叙事；pre不是 pre，是人格重塑。',
    strengths: ['脑洞强', '幽默感高级', '会把生活变成内容'],
    risks: ['容易飘太远', '会把真实疲惫包装得太轻巧'],
    advice: '抽象很好，但别只抽象，也要记得吃饭睡觉交作业。',
  },
  mutant: {
    id: 'mutant',
    name: '变异型选手',
    tagline: '平时状态成谜，关键时刻突然封神。',
    description:
      '你不是持续稳定输出型，你更像间歇性高能生物。平时看起来很飘，但关键时刻会突然进入极强状态。',
    strengths: ['爆发力强', '关键时刻能顶', '不容易被别人看透'],
    risks: ['节奏不稳定', '容易靠极限状态完成一切'],
    advice: '别总拿爆发当常规解法，留一点稳定会更轻松。',
  },
  spokesperson: {
    id: 'spokesperson',
    name: '宇宙嘴替',
    tagline: '你最擅长的事，是把大家说不明白的状态说出来。',
    description:
      '你很像专门替这个荒诞世界配字幕的人。很多人只是觉得烦、累、无语，但你能一下说出最准确、最好笑、最有共鸣的表达。',
    strengths: ['表达能力强', '共鸣制造能力强', '很会捕捉群体情绪'],
    risks: ['容易把真情绪都处理成段子', '别人觉得你轻松其实未必'],
    advice: '继续做神级嘴替，但有些情绪也可以先不变成梗。',
  },
  ruleTamer: {
    id: 'ruleTamer',
    name: '规则驯兽师',
    tagline: '规则再离谱，你也会先研究怎么活用它。',
    description:
      '你对大学生活的理解很务实。系统烂、机制怪、选课难、流程绕，你都知道，但你的本能不是纯抱怨，而是先研究到底怎么活下去。',
    strengths: ['很懂机制', '求生欲强', '能在不友好的环境里找到路径'],
    risks: ['容易长期处于对抗状态', '可能太习惯适应烂规则'],
    advice: '效率之外，也给自己留点呼吸空间。',
  },
  buffer: {
    id: 'buffer',
    name: '失控缓冲带',
    tagline: '你不是最响的那一层，但你总在帮世界少崩一点。',
    description:
      '你很像天然的缓冲层。宿舍气氛怪的时候、小组要炸的时候、朋友情绪崩的时候，你常常让事情不至于进一步失控。',
    strengths: ['稳定', '情绪承载力强', '让人有安全感'],
    risks: ['容易变成默认缓冲垫', '很少有人注意到你也会累'],
    advice: '你可以接住别人，但不必永远接住所有人。',
  },
  survivor: {
    id: 'survivor',
    name: '续命型玩家',
    tagline: '你的生存哲学是：先续上，再说别的。',
    description:
      '你太懂大学生活的底色了。很多时候，所谓努力、成长、规划，都得建立在一个前提上：人先别彻底没电。',
    strengths: ['生存感强', '会自我修复', '不容易被一时崩溃带走'],
    risks: ['容易停在能活着就行', '可能把很多事推到最后一刻'],
    advice: '续命能力很珍贵，下一步是给自己多一点主动感。',
  },
  stuck: {
    id: 'stuck',
    name: '副本卡关者',
    tagline: '你常觉得自己在重复读档，但居然也一路走到了这里。',
    description:
      '你的大学体验很像卡在一个大型副本里：抢课卡一次、作业卡一次、pre 卡一次、食堂和早八再轮流补刀。',
    strengths: ['抗打击能力强', '会苦中作乐', '麻了但还能走'],
    risks: ['容易慢性麻木', '容易把疲惫当成常态'],
    advice: '别只顾着过关，也看看自己是不是已经太累了。',
  },
  philosopher: {
    id: 'philosopher',
    name: '走神型哲学家',
    tagline: '别人走神是在发呆，你走神是在另一个维度思考人生。',
    description:
      '你很容易从一个细节一路想远。教学楼、厕所味道、选课系统循环、pre 现场窒息感，这些在别人眼里只是日常，在你这里却会延伸成更大的联想。',
    strengths: ['思考深', '对荒诞和细节都敏感', '容易形成自己的世界观'],
    risks: ['容易想远了忘记眼前的事', '容易过度抽离或内耗'],
    advice: '继续思考世界，但也记得偶尔把灵魂叫回来。',
  },
}

const questions = [
  ['预选抽签结果公布后，你通常会：', ['去蹲正选', '去搜集选到的课的资料', '发个朋友圈', '不好意思，我都是内置课'], [{ base: 'A', tags: { ruleTamer: 2 } }, { base: 'B', tags: { observer: 1 } }, { base: 'C', tags: { accomplice: 1 } }, { base: 'D', tags: { abstractGen: 1 } }]],
  ['如果你的灵魂在教学楼里游荡，它最可能停在哪：', ['自习室最后一排，安静吸收知识能量', '有人聊天的走廊，顺便听八百个消息', '楼梯拐角，思考“我为什么会出现在这里”', '自动售卖机旁，研究人生和零食饮料的关系'], [{ base: 'A', tags: { survivor: 1 } }, { base: 'B', tags: { accomplice: 1 } }, { base: 'C', tags: { philosopher: 2 } }, { base: 'D', tags: { abstractGen: 2 } }]],
  ['当你推开宿舍厕所门，发现里面气味已经具象化了，你第一反应是：', ['迅速判断局势并规划最短撤离路线', '和室友对视一眼，用沉默完成信息共享', '接受现实，屏住呼吸完成生存挑战', '突然觉得这味道像一场关于人性的行为艺术'], [{ base: 'A', tags: { ruleTamer: 1 } }, { base: 'B', tags: { accomplice: 1 } }, { base: 'C', tags: { survivor: 1 } }, { base: 'D', tags: { philosopher: 2 } }]],
  ['你选课时最看重的是：', ['对未来发展有没有帮助', '这门课的课程难易程度', '这门课选中的概率', '培养方案写啥我选啥'], [{ base: 'A', tags: { ruleTamer: 2 } }, { base: 'B', tags: { survivor: 1 } }, { base: 'C', tags: { stuck: 1 } }, { base: 'D', tags: { observer: 1 } }]],
  ['当DDL靠近时，你的精神状态更像：', ['一台高效运转但快冒烟的机器', '一个到处摇人求共鸣的互联网嘴替', '一只躺着不动但内心尖叫的猫', '一个突然被宇宙点亮天赋的疯子'], [{ base: 'A', tags: { dispatcher: 2 } }, { base: 'B', tags: { accomplice: 1 } }, { base: 'C', tags: { survivor: 1 } }, { base: 'D', tags: { mutant: 2 } }]],
  ['面对“有人大便不冲”这类宿舍公共谜题，你更可能：', ['想办法去匿名墙建立规则，试图终结混乱', '和别人一起吐槽，并迅速形成情绪共同体', '默默绕开，当作自己什么都没看到', '打不过就加入'], [{ base: 'A', tags: { ruleTamer: 2 } }, { base: 'B', tags: { accomplice: 2 } }, { base: 'C', tags: { observer: 1 } }, { base: 'D', tags: { abstractGen: 1 } }]],
  ['离DDL还有一周时，你往往会：', ['已经开始并推进不少了', '和同学交流进度', '觉得时间还挺充裕', '还有一周，不叫DDL'], [{ base: 'A', tags: { dispatcher: 2 } }, { base: 'B', tags: { cpuFuel: 1 } }, { base: 'C', tags: { survivor: 1 } }, { base: 'D', tags: { mutant: 2 } }]],
  ['你作为低年级蹲点抢课，结果必修课（体育/英语/通识）全被高年级抢走，你的反应是：', ['当场破防，在选课群发疯，主打“凭什么”', '冷静接受，默默记下，等着大四当“霸王”，主打“风水轮流转，欠我的要还”', '佛系摆烂，反正抢不到，不如不抢，等着后续捡漏', '麻了，这剧情我熟，原来我的大学不是在修学分，是在参与一个循环叙事'], [{ base: 'A', tags: { accomplice: 1 } }, { base: 'B', tags: { stuck: 1 } }, { base: 'C', tags: { survivor: 1 } }, { base: 'D', tags: { philosopher: 2 } }]],
  ['假设Pre能净化厕所臭味，你会怎么操作：', ['把摆烂Pre扔进去，主打“摆烂Pre配臭味，绝配”', '把精品Pre扔进去，主打“用高级Pre净化低级臭味”', '自己现场做Pre，用Pre的声音掩盖臭味，主打“声东击西”', '把所有Pre都扔进去，主打“彻底净化，惠园无臭”'], [{ base: 'A', tags: { abstractGen: 1 } }, { base: 'B', tags: { spokesperson: 1 } }, { base: 'C', tags: { cpuFuel: 1 } }, { base: 'D', tags: { abstractGen: 2 } }]],
  ['面对早八课程，你的常态是？', ['提前到场，占座加预习，沉浸式投入课堂', '卡点战神，踩着铃声进教室', '偶尔迟到，但不影响课堂进度', '没去过'], [{ base: 'A', tags: { dispatcher: 1 } }, { base: 'B', tags: { cpuFuel: 1 } }, { base: 'C', tags: { survivor: 2 } }, { base: 'D', tags: { stuck: 1 } }]],
  ['如果老师说“这次作业很简单”，你会：', ['好，那我马上安排', '有多简单我也不做', '表面平静，内心已经开始质疑世界', '笑了，越这么说事情越不对劲'], [{ base: 'A', tags: { dispatcher: 1 } }, { base: 'B', tags: { stuck: 1 } }, { base: 'C', tags: { observer: 1 } }, { base: 'D', tags: { philosopher: 1 } }]],
  ['如果把UIBE选课比作一种游戏机制，它更像：', ['需要提前攻略的资源管理游戏', '多人联机信息争夺战', '随机掉落、看命求生的生存游戏', '规则不断自我吞噬的BUG测试服'], [{ base: 'A', tags: { ruleTamer: 2 } }, { base: 'B', tags: { accomplice: 1 } }, { base: 'C', tags: { stuck: 2 } }, { base: 'D', tags: { philosopher: 1 } }]],
  ['在宿舍里，你更常扮演的角色是：', ['负责提醒和安排的人', '最会聊天和调节气氛的人', '比较安静随和的人', '两点一线的NPC'], [{ base: 'A', tags: { dispatcher: 2 } }, { base: 'B', tags: { accomplice: 2 } }, { base: 'C', tags: { buffer: 1 } }, { base: 'D', tags: { observer: 1 } }]],
  ['如果你的大学生活是一句弹幕，它更可能是：', ['“稳住，我们能赢。”', '“这也太有意思了吧哈哈哈哈。”', '“人还活着就算胜利。”', '“要是能重来，我要选985。”'], [{ base: 'A', tags: { dispatcher: 1 } }, { base: 'B', tags: { spokesperson: 1 } }, { base: 'C', tags: { survivor: 1 } }, { base: 'D', tags: { stuck: 2 } }]],
  ['当你端着一份又贵又难吃的饭坐下时，你的内心OS更可能是：', ['算了，先吃完再说', '我得拍给朋友看一下', '人生总有一些不值得细想的瞬间', '这一口下去，我和世界的关系又复杂了一点'], [{ base: 'A', tags: { ruleTamer: 1 } }, { base: 'B', tags: { accomplice: 1 } }, { base: 'C', tags: { stuck: 1 } }, { base: 'D', tags: { philosopher: 2 } }]],
  ['如果老师提问没人回答，你更可能：', ['只要会就会回答', '看气氛合适就接一下', '尽量避免被点到', '刷会小红书压压惊'], [{ base: 'A', tags: { cpuFuel: 1 } }, { base: 'B', tags: { dispatcher: 1 } }, { base: 'C', tags: { observer: 1 } }, { base: 'D', tags: { survivor: 1 } }]],
  ['如果现在的你是一种能量体，你更像：', ['可持续输出型异能兽', '靠他人互动充电的信号塔', '电量常年飘忽不定的旧手机', '时强时弱但偶尔爆闪的球形闪电'], [{ base: 'A', tags: { cpuFuel: 1 } }, { base: 'B', tags: { accomplice: 1 } }, { base: 'C', tags: { survivor: 2 } }, { base: 'D', tags: { mutant: 2 } }]],
  ['对于实习、比赛、证书这类事情，你更倾向于：', ['提前规划、逐步积累', '参考身边优秀同学的路径', '等真正需要了再说', '选和自己兴趣更匹配的'], [{ base: 'A', tags: { ruleTamer: 2 } }, { base: 'B', tags: { dispatcher: 1 } }, { base: 'C', tags: { survivor: 1 } }, { base: 'D', tags: { abstractGen: 1 } }]],
  ['在CPU大学连续做Pre之后，你觉得自己更像：', ['表达能力持续升级的人', '被群体互动激活的人', '一个被迫学会开机说话的低电量生物', '一种嘴在输出、魂在旁观的双线程生命体'], [{ base: 'A', tags: { cpuFuel: 2 } }, { base: 'B', tags: { accomplice: 1 } }, { base: 'C', tags: { survivor: 1 } }, { base: 'D', tags: { mutant: 2 } }]],
  ['如果小组里一直没人推进，你会：', ['站出来把事情往前推', '先鼓励大家动起来', '希望有人先带头', '摆烂'], [{ base: 'A', tags: { dispatcher: 2 } }, { base: 'B', tags: { buffer: 1 } }, { base: 'C', tags: { observer: 1 } }, { base: 'D', tags: { stuck: 1 } }]],
  ['如果把你的UIBE日常压缩成一个副本，它最可能包含：', ['选课、作业、Pre，一切按计划闯关', '和朋友互通情报、一起吐槽、抱团求生', '被臭厕所、难吃食堂和抢课失败轮流教育', '在荒诞制度与精神震荡中逐渐养成自己的宇宙观'], [{ base: 'A', tags: { ruleTamer: 1 } }, { base: 'B', tags: { accomplice: 2 } }, { base: 'C', tags: { stuck: 2 } }, { base: 'D', tags: { philosopher: 2 } }]],
  ['如果今天突然没课了，你最可能：', ['去图书馆或者教室自习', '和朋友出去玩', '睡一天', '去教室站上讲台，给台下空气讲一节课'], [{ base: 'A', tags: { ruleTamer: 1 } }, { base: 'B', tags: { accomplice: 1 } }, { base: 'C', tags: { survivor: 2 } }, { base: 'D', tags: { abstractGen: 2 } }]],
  ['如果让你用一句话总结UIBE对你的影响，你更可能选：', ['它让我变得更会安排', '它让我学会在高压里和别人一起活', '它让我明白“活着”本身就是一种能力', '它把我培养成了一个能在荒诞中保持幽默和输出的人'], [{ base: 'A', tags: { dispatcher: 1 } }, { base: 'B', tags: { buffer: 1 } }, { base: 'C', tags: { survivor: 1 } }, { base: 'D', tags: { spokesperson: 2 } }]],
  ['面对“食堂又贵又难吃”这件事，你更接近：', ['理性计算派：怎么吃最不亏', '结伴吐槽派：一个人受苦不如大家一起受苦', '低期待生存派：能吃就行', '抽象升华派：贵和难吃能并存，本身就很先锋'], [{ base: 'A', tags: { ruleTamer: 1 } }, { base: 'B', tags: { accomplice: 2 } }, { base: 'C', tags: { survivor: 1 } }, { base: 'D', tags: { abstractGen: 1 } }]],
  ['如果UIBE这种环境逼你从I变E，你更接近哪种状态：', ['虽然痛苦，但已经学会适应', '越讲越敢，甚至开始享受输出', '身体在台上，灵魂还在后台', '表面很E，内核还是一团安静但崩溃的雾'], [{ base: 'A', tags: { cpuFuel: 1 } }, { base: 'B', tags: { cpuFuel: 2 } }, { base: 'C', tags: { observer: 1 } }, { base: 'D', tags: { mutant: 1 } }]],
].map(([question, texts, scores], idx) => ({
  id: idx + 1,
  question,
  options: texts.map((text, i) => ({ key: ['A', 'B', 'C', 'D'][i], text, scores: scores[i] })),
}))

function calculateResult(answers) {
  const baseScores = { A: 0, B: 0, C: 0, D: 0 }
  const tagScores = Object.keys(personalities).reduce((acc, key) => {
    acc[key] = 0
    return acc
  }, {})

  questions.forEach((question, index) => {
    const selectedKey = answers[index]
    const option = question.options.find((item) => item.key === selectedKey)
    if (!option) return
    baseScores[option.scores.base] += 1
    Object.entries(option.scores.tags || {}).forEach(([key, value]) => {
      tagScores[key] += value
    })
  })

  const finalScores = {
    dispatcher: baseScores.A * 2 + baseScores.B * 0.5 + tagScores.dispatcher,
    accomplice: baseScores.B * 2 + baseScores.C * 0.5 + baseScores.D * 0.5 + tagScores.accomplice,
    cpuFuel: baseScores.A * 1 + baseScores.B * 1.5 + baseScores.D * 0.5 + tagScores.cpuFuel,
    observer: baseScores.C * 1.5 + baseScores.D * 1.5 + tagScores.observer,
    abstractGen: baseScores.D * 2 + tagScores.abstractGen,
    mutant: baseScores.D * 1.5 + baseScores.A * 1 + tagScores.mutant,
    spokesperson: baseScores.B * 1.5 + baseScores.D * 1.5 + tagScores.spokesperson,
    ruleTamer: baseScores.A * 2 + baseScores.C * 0.5 + tagScores.ruleTamer,
    buffer: baseScores.C * 1 + baseScores.A * 1 + baseScores.B * 0.5 + tagScores.buffer,
    survivor: baseScores.C * 2 + tagScores.survivor,
    stuck: baseScores.C * 1.5 + baseScores.D * 1 + tagScores.stuck,
    philosopher: baseScores.D * 1.5 + baseScores.C * 1 + tagScores.philosopher,
  }

  const ranking = Object.entries(finalScores)
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ ...personalities[id], score }))

  return { baseScores, ranking, topResult: ranking[0] }
}

const chips = ['25道题', '12种人格', '选课 / DDL / Pre / 宿舍 / 食堂 / 抽象精神状态']

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function App() {
  const [step, setStep] = useState('home')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState('')

  const currentQuestion = questions[currentIndex]
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100)

  const result = useMemo(() => {
    if (answers.length !== questions.length) return null
    return calculateResult(answers)
  }, [answers])

  const startQuiz = () => {
    setStep('quiz')
    setCurrentIndex(0)
    setAnswers([])
    setSelected('')
  }

  const nextQuestion = () => {
    if (!selected) return
    const nextAnswers = [...answers]
    nextAnswers[currentIndex] = selected
    setAnswers(nextAnswers)
    if (currentIndex === questions.length - 1) {
      setStep('result')
      return
    }
    const nextIndex = currentIndex + 1
    setCurrentIndex(nextIndex)
    setSelected(nextAnswers[nextIndex] || '')
  }

  const restart = () => {
    setStep('home')
    setCurrentIndex(0)
    setAnswers([])
    setSelected('')
  }

  return (
    <div className="app-shell">
      <div className="app-wrap">
        {step === 'home' && (
          <>
            <section className="hero-card">
              <div className="eyebrow">UIBE 校园人格测试</div>
              <h1 className="hero-title">UIBETI</h1>
              <p className="hero-text">
                测测你在 UIBE 的精神运行方式。<br />
                25道题，12种人格，覆盖选课、DDL、Pre、宿舍、食堂和抽象状态。
              </p>
              <div className="chip-row">
                {chips.map((item) => (
                  <span key={item} className="chip chip-dark">{item}</span>
                ))}
              </div>
              <button className="primary-btn light" onClick={startQuiz}>开始测试</button>
            </section>

            <section className="card mt-16">
              <h2 className="section-title">这个测试会测什么</h2>
              <p className="body-text">
                它不是普通 MBTI 换皮。它更像一份只属于 UIBE 学生的校园精神切片：你是人间调度台、续命型玩家、抽象发电机，还是宇宙嘴替？
              </p>
            </section>
          </>
        )}

        {step === 'quiz' && currentQuestion && (
          <section className="card">
            <div className="top-row">
              <span className="chip chip-accent">第 {currentIndex + 1} / {questions.length} 题</span>
              <span className="muted">{progress}%</span>
            </div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <h2 className="question-title">{currentQuestion.question}</h2>
            <div className="option-list">
              {currentQuestion.options.map((option) => {
                const active = selected === option.key
                return (
                  <button key={option.key} className={`option-card ${active ? 'active' : ''}`} onClick={() => setSelected(option.key)}>
                    <span className={`option-key ${active ? 'active' : ''}`}>{option.key}</span>
                    <span className="option-text">{option.text}</span>
                  </button>
                )
              })}
            </div>
            <button className="primary-btn accent mt-16" disabled={!selected} onClick={nextQuestion}>
              {currentIndex === questions.length - 1 ? '提交并查看结果' : '下一题'}
            </button>
          </section>
        )}

        {step === 'result' && result && (
          <>
            <section className="hero-card">
              <div className="eyebrow">你的 UIBETI 人格</div>
              <h1 className="result-title">{result.topResult.name}</h1>
              <p className="hero-text small">{result.topResult.tagline}</p>
              <div className="chip-row"><span className="chip chip-dark">Top 1 · {result.topResult.score.toFixed(1)}分</span></div>
            </section>

            <section className="card mt-16">
              <h2 className="section-title">人格描述</h2>
              <p className="body-text">{result.topResult.description}</p>
              <div className="divider" />
              <h3 className="sub-title">你的优点</h3>
              <div className="chip-row">
                {result.topResult.strengths.map((item) => <span key={item} className="chip chip-soft">{item}</span>)}
              </div>
              <h3 className="sub-title mt-16">你的风险</h3>
              <div className="chip-row">
                {result.topResult.risks.map((item) => <span key={item} className="chip chip-warn">{item}</span>)}
              </div>
              <div className="soft-panel mt-16">
                <h3 className="sub-title">生存建议</h3>
                <p className="body-text">{result.topResult.advice}</p>
              </div>
            </section>

            <section className="card mt-16">
              <h2 className="section-title">你的四维分布</h2>
              <div className="grid-two mt-16">
                <StatCard value={result.baseScores.A} label="执行 / 规划 / 控场" />
                <StatCard value={result.baseScores.B} label="社交 / 共鸣 / 连接" />
                <StatCard value={result.baseScores.C} label="生存 / 佛系 / 低耗能" />
                <StatCard value={result.baseScores.D} label="抽象 / 变异 / 脑洞" />
              </div>
            </section>

            <section className="card mt-16">
              <h2 className="section-title">人格排名 Top 3</h2>
              <div className="rank-list mt-16">
                {result.ranking.slice(0, 3).map((item, idx) => (
                  <div key={item.id} className="rank-card">
                    <div className="top-row">
                      <div className="rank-name">{idx + 1}. {item.name}</div>
                      <span className="chip chip-accent">{item.score.toFixed(1)}分</span>
                    </div>
                    <div className="muted body-small">{item.tagline}</div>
                  </div>
                ))}
              </div>
            </section>

            <div className="button-row mt-16">
              <button className="primary-btn accent" onClick={() => window.print()}>保存 / 分享结果页</button>
              <button className="secondary-btn" onClick={restart}>再测一次</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
