console.log( "===== simpread option unread list load =====" )

import List from 'list';

export default class Unrdist extends React.Component {
    render() {
        return (
            <list>
                <list-header>未读列表：100 条</list-header>
                <list-item>
                    <avatar>G</avatar>
                    <content>
                        <a href="http://www.ifanr.com/817218" target="_blank">Google 要学 Pinterest，让你边搜索图片边剁手 | 爱范儿</a>
                    </content>
                    <icon>15 mins</icon>
                </list-item>
                <list-item>
                    <avatar>换</avatar>
                    <content>
                        <a href="http://www.cnbeta.com/articles/tech/601485.htm" target="_blank">换壳为本？Nokia 6 银白色版 1499 元起正式开卖</a>
                        <subtitle>4 月 4 日的时候，诺基亚官方宣传，将于在 4 月 11 日正式发售全新配色的 Nokia 6 智能手机，即银白色版本，并且从那时起已经正式提供预约服务4 月 4 日的时候，诺基亚官方宣传，将于在 4 月 11 日正式发售全新配色的 Nokia 6 智能手机，即银白色版本，并且从那时起已经正式提供预约服务</subtitle>
                    </content>
                    <icon>2 days</icon>
                </list-item>
            </list>
        )
    }
}