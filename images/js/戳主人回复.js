/* 
by如愿(2368635993) 
乱写的戳一戳，不同的是写了戳一戳cd防模块
安装后记得重启，不要随意动下面的代码
感谢煌.(2608259582)帮我修复的撤回
最近修改于2024/11/22 11:00
*/

const MasterQQ = 114514 //这里填自己主人的QQ号

export class chuo extends plugin {
  constructor() {
    super({
      name: '戳主人回复',
      dsc: '戳主人回复',
      event: 'notice.group.poke',
      priority: -114514
    })
  }

  async accept(e) {
    if (e.operator_id == MasterQQ) return false;

    if (await redis.get(`jntm${e.target_id}`)) {
      logger.mark(`『冷却中.』`)
      return false
    }

    if (e.target_id == MasterQQ) {
      await redis.set(`jntm${e.target_id}`, '1', { EX: 10 })// 10秒自动过期
      logger.info('『憨憨有人戳你啦.』'); // 控制台显示
      let ciku = ['哼，戳主人干嘛\n我要替主人报仇.', '不要再戳主人啦~', '哼，戳回去.']// 文案可以自己照着改
      let i = Math.round(Math.random() * (ciku.length - 1))
      let msg = await this.reply(ciku[i])
      await e.group.pokeMember(e.operator_id); // 戳回去
      return setTimeout(() => { e.group.recallMsg(msg.message_id) }, 10000)//感谢煌.(2608259582)帮我修复的撤回
    }
  }
}