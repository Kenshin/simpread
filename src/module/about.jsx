console.log( "===== simpread option about load =====" )

const style = {

    root: {
        fontSize: '1.6rem',
        color: 'rgba(51, 51, 51, 0.87)',
    },

    title: {
        fontSize: '2rem',
        fontWeight: 800,
    },

    badges: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

        margin: '1.2em 0',
    },

    img: {
        padding: '5px',
    },

    stat: {
        color: '#ff3f80',
        fontWeight: 600
    },

    link: {
        borderBottom: '1px solid #4285f4',
    },

    share: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

        margin: '1.2em 0',

        zoom: 0.7,
    },

    share_link: {
        margin: '10px',
    },

    share_icon: {
        display: 'block',

        margin: '5px',

        width: '48px',
        height: '48px',

        opacity: 0.3,

        transition : 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',

        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },

    share_icon_over: {
        opacity: 0.54,
    }

},
urls = {
    share: {
        weibo: "http://service.weibo.com/share/share.php?url=http://ksria.com/simpread&title=%E7%AE%80%E6%82%A6%EF%BC%88SimpRead%EF%BC%89-%20%E8%AE%A9%E4%BD%A0%E7%9E%AC%E9%97%B4%E8%BF%9B%E5%85%A5%E6%B2%89%E6%B5%B8%E5%BC%8F%E9%98%85%E8%AF%BB%E7%9A%84%20Chrome%20%E6%89%A9%E5%B1%95&pic=http://ksria.com/simpread/assets/image/introduce.png",
        douban: "https://www.douban.com/share/service?href=http://ksria.com/simpread&name=简悦（SimpRead）-%20让你瞬间进入沉浸式阅读的%20Chrome%20扩展",
        twitter: "https://twitter.com/intent/tweet?via=wanglei001&amp;text=简悦（SimpRead）-%20让你瞬间进入沉浸式阅读的%20Chrome%20扩展&amp;url=http://ksria.com/simpread",
        facebook: "https://www.facebook.com/dialog/feed?app_id=1528743474024441&link=http://ksria.com/simpread&picture=http://simpread.qiniudn.com/introduce.png&name=simpread&description=%E7%AE%80%E6%82%A6%EF%BC%88SimpRead%EF%BC%89-%20%E8%AE%A9%E4%BD%A0%E7%9E%AC%E9%97%B4%E8%BF%9B%E5%85%A5%E6%B2%89%E6%B5%B8%E5%BC%8F%E9%98%85%E8%AF%BB%E7%9A%84%20Chrome%20%E6%89%A9%E5%B1%95&redirect_uri=http://ksria.com/simpread",
        gplus: "https://plus.google.com/share?url=http://ksria.com/simpread",
    },

    icon: {
        weibo: {
            backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD4ElEQVRoQ+2Yj5FMQRDG+yJABIgAESACRIAIEAEiQASIABEgAkSADIiA+l1Nb/Xr7Z6eeee82qqdqq2629cz7/u6v/4zeyIHvk4OHL8cCWwdwWMEjhE4owe2lNAVEbkvIrcchx8i8klEPojIr4rfVgQA/0VELnYAAv6liLzqEdmKwGMReVF5tz0nIg9bVPa2bEUAzyOTayLyuf19XUT4XE6I3ROR9/7ZVgR6zocEESI/7EJSt0Xkq/3yXxG405KRl7Pwble7A/LhLM65YGz5HxK7dRYCyOBR81aUjHjqRgFUK5GasYfqoysiwZm7KKwlcFdEXhdVBBB4C69li2c33UPAsU9LKGX2o7EhskjsdM0SwNNUjwcDEsDkuYg869hyjj1LyfjoUYk0uUn6Xe+YIQB4PKE6H+HwpNXyEVtsiOy7ZmyrDv0AubJWEQA0B6PZmaUSgjyJDkC8pzmDZyFpy6PKykaPKD5tL2bP1RkJAR7P97pmRkqBAby3Im9bAjYy36wKKgmtkc1MhNTWygLSRCuLwFubNz0C/wu81zXepsrw0XKppLBd5FWPAGVytNqs8brds/BqcNgf892iNGcErOZ64H62Ok9i6cfak7DVjIN91S80iRcViI0RAaTzvZO0gCaklDZAj65sxmH/mzZ6LOackYMjArZk2TN+N9AALy8anZdDBMBMon5BAI33uvdijyeQeZ/SRT54D2FP91SpcLjeqNB1b0VjhNoz/0OyXJ4AIEleuwAPQO91xl2ikfUHiFDfM1mwDxs7bep7eRdDWylRT8CWKz1sMf21LyOikbcAQtfMJJfJlbMWQ1sWCk+A5LXjQlTeeI7d6OqVSD9p2jP3Kk70Qk/A1lvso/KGNv1tSc8GLGHXuUVzYje7OBAkNJf7aK0igF5tdbgUhN9GiTCzByBMi8iNv30eZf2mF4GquZ2S9gd770b61yj5Ubmn54yAHZN9FMJLvDeqqlBUzpSAj06W2JkUeg2TnjM0/UaesbefvUt00zi3I0uOxGbkju4L2ZjA/SIbs4e8H0mI7/wc5KVin2vHRPeRx7KG1BsUh7SvUsq06XPBA0EuaD77EYp5CRs/EkAS8Jnnp8BnEVByngRNjmjY7ggQvK+XbABTlfZ+QWult9e5qx8Awlpb3cgACBFt93RUwGn5rJoZ5LhdEY3sPp1Fqzo7LKPRJsKuNyQ7t0AGb0cyATiAez8CMGMRkaGhbXSUqFjjSeRCZKIhrNqvdwlAT8/+I6NEBcA+x7t628q8rVECLJ9yupwBUCXx7Fmb2FdJvAmomZceCcx46zxsjxE4D6/OnHnwEfgL4tbYMcQgCeMAAAAASUVORK5CYII=)"
        },
        facebook: {
            backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAABJklEQVRYR+2X0RFBMRBFz+tACTpABaiATtCBEqiEDtABJShBBUxM3ozJR7JJ1vPMbH58WLln7t5souE7awmMgJnfvv0M1RqpvLhQuOEWWAEDYb1YX1yYEHZgJ2AsBGzLxPriwgTAGZhmQrpysb64MALh8ngogOwc9Ags/gH0WQjZqaNu7LhDFFs3YA24HBev2oxKQCfAtZjQ/7AL0FqNN2rtJhJHazUMtPg+j+W4ti29bX3NzAwNe2Q8XrIPkybo5eMZmJxeua3XBN37iyAJWTKeNEE3wE5EWTBHNUHnOdfqL1ufpZ1VDGg5egeG0raXZDTcu7dz1EBTMcjNqDlqjnoH7NRrP2rNUXM0Ml5qZ7X9C9WOlzlqjqbeA7HvbeBr58ccDR19AdW1MyvTLEN7AAAAAElFTkSuQmCC)"
        },
        twitter: {
            backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAACb0lEQVRYR+2YjzEEMRTGv6uADlABKkAHVIAOqIAOUAEqoANUgA6oABUwv5tkZy/3kmz2n7mZfTM3Zlw2+e2X97683EwrErMV4dQE2vdOTYoaiq5L2nb//5T0UaL6GIruS7qQxN96fEs6k3RvAG9K4sXe/HcWKBMySTWo5M2DsVcOJjUFygL87hQ/lHQiaTcH+ihpT9JBR9gHSSzaJm7CF7QU/XUzo2pbWBRCzTZBKqDojtvZeS6HoGz7UzD7qaS7whW/XI4VPjYvMD7k6I+Dnc8RgvIWr8bspAPAqJyL2By55+rf4wqIVjlDauvDiYG8lET+pIIxVHnboKh8QVdzWKBUu/c7azGAr52tWF7YFXTL8lgLlES+bSgHL0VaPEvyJt4V1PT2mOGzMBY1drwYB4NZTP5EYEuBTaXAEC/RGJRjC2shD4GlgseMJaP3i1tbD+TamHS1tc5doS4tb4Fi7sf/BLpwvtcZLFDylGoeW1VOIlLPjFjVl1hUX+L7M74IlMFjwx45Ty4G5QHSAAMfOmeT2w5IqsP3nbkHBnqoyHZoKVASGy8duqg4erMi5O5MdOh06kNGMjdThh9CDVlU0ZMohMgp6sdzlNLa9dmomH1nqY/GxpNLpAONcdScG+RJEWSu6q31AKVXDe/oDdiqIcWQJaCA4aXka5donJOpHK3/5MI44FDQ/+0CiAVxheY20CrCYkIxTqKNVrMtP8SJQxHyaXKDjS6bakpQoG2Hj4LA0TJ2Amzqo77K2X4sKqY0ytEacn1he/v43WpB3aY+Wn8I+PqRB1QvqqXSrQ1oT+lbNs0EWqZXfvSkaF6jshF/k8xwK5ptGYMAAAAASUVORK5CYII=)"
        },
        gplus: {
            backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAC6ElEQVRYR+WYgW1UMQyG/05ANwAmoEwATACdADpBYQJgAmACYIK2E7SdgDIBZQPYAH3SM7IsJ/G7i+6oiHTq9ZL3/Oe3/dvJge7IOLgjOLUW6KGkJ5KOihu8lnRVXNtdVgX6UtIrSU+LRn9LOpf0TtJt8ZmtgALss6QHRWPHC7Cb4vrysh6jMAhIG18lfVn+IQReL2Hgjf2S9EzSzoASg98cgveLGyMDHyWdhh8B+bhMVXFhi9FLF4/EG66HrWwQi8/DBECnspoBjWySub0kYo6N+fFGEmxPGxlQMvVtwe0eBJl9f+UzqzaRAUX30Eobrfj0hmKsjp4hlPzGfo5krAL0QtKLwfbXemHt+rQyRUZx68N/EegmWYy+Ur1sjLJ+CqMI+YfAIOCpOtlA/H9I4i+DeBtVsilAMYLhOFqSE42euArWipgpQHl5VnHsdzLaxJ+q5PWSMkvpHY1pQHEj7vYy5Y1TdVjjXZyBjIk52kCc/1tsRm0eO4chr3mZse+NHnVnQA0UOkpphUW+R+B0TFmDvHOgnsUYX8y1KtFegcLoWeL/SrbbY9OSqRf0uJ9qdW8LsDsB2pMv5irMTgeK/CBR9Jx8RhXHSG4l13TXA4qeNGuYkSIT/JbOMk8j0zoVTGEUgLzID4SXCkQRiIPkYv2jMNGrUlsDzaSneqyIHRS4YTU71xNCPoxY0z3/+8qUNSNVkIBCDSitvhhUEqtUVj3QyGarLPZevPZIUgLJIg90k7NSNBRPpKOz0/8F9NNybVPeddLHjvS0/G7v+hhfIy2MRkhGroHsSMINi30vA2ot9ECzZoMsthu6njFaQC7U/L3pJh5p2oiNc7zx4EGYRej5IPxWbexSlw3G4weKQWK1KtNqhiNQGCH7s86o+nJOobxnGsgoTwYEI7A3On5kwHE3ejwVZAuoAcCduDVeKUaAMMjGSMYp1+AZA6PDnT1jLZ6vzyQawKbeg1ayvhqDe1lXZXQv4LzRP1o3sivmQ+AFAAAAAElFTkSuQmCC)"
        },
        douban: {
            backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAD+0lEQVRYR+2Y4ZFNQRCFz0aACNgIEAEiQASIABEgAkSACBDBrggQASJABNT36vat3r7dM3fu3f2hSle92tr3ZnrOnO4+0zNH+kfs6IJxPpd0SdIXSZ8kfd+63h6glyXdknRP0o3pc1/ShwkMv3+TxF8zAD+VdDoKeA9QFgOot48TcL57KOlNAuh4C7N7gFZAbk5AIptg9hsZInUN0NtT+CyktgAhJefIQW8w/VrS+wSJT41zBWqs/ZJkTPkFXkl6nKz4aEqBu+63r1Mex+HkOJt+20LeYhQmT0Ih3JEE6B6rjIE9NnJ9GsxGKSZv1yR9dkDZYGoVUO/ATySkT4InJOhZ4t2DJR3iPKYAEsUwQxHY3MJaQNl9zD8cZFXLWGPOL2Jg+d1HgjHVBtM8boWe3MkK4t0kPQaIFHlZ5B9jAAhTPgeriP2e/CwOhl7V4/xBiMMPBwqAFJwBwl8WBX4n/OQgIDK/jClVoQeUakSWcE747ESh0g1gDHULLGPRUq8GNr+psREoCW+MGCjCxIekN02tinMNs9VcVIG1IYe1+Av4A44IlNMEUFuNtCC3yUvCG4/Yyi95D7DI9MyyB8oukIuthnRRyb66iZB1UC2/5GZWuMy5gk8PtJKLHnB2DaCqhYMpfvdp5X0SBdbOGpi5wDzQrBtqgWQBcnZtj2mFmXVcRCGqi639go14oL6v9D0kE/g/CjqNMEBHLCMDIFZAUUFMaU578mQT47nP9zDJKTViGdBVHdUeoJlq9EBnQGl0uh3/f6AFtefCqBVMTGzkh+98bwoOqn70cMiA0taR71bA1mnhf1YUC33VqQMIoEyOPeeWqq+akSq3ZzIMKGJMJ5QZLRrSlR2HMIS89IoB1aCRwc+ILY7Q1vFJs0DYo7b6BQHKhrKrBgSMAjTfc8fvq558uBq2y4WMtKiOt8gORyEMYzCYXisGKJ1vE9lZDzhrLCx3R04g2GX+CIvkuzfS7Myttaej1XVkgJR0qPWZf9zxCdgyAi2g5CRtX5Qga0bo8KuOKEPHfYjbAukBAVnxls89LaDkZXbd4N5jFzV7OMiuFh4sbOHLdJHN06RHI204UhdWAc2aECZXIt+St6p5qTQ1eztYXEX8TjJHWQNBKKlwrhPZ8w4+s3mwmr0dDAMlrITC+tBDAxti4u/nVHoFtmI1vgiWN9Fe1RtYFsrkJrIOQ8hK1q1nG2XfJoHMI+Xii8qBmx5QIxDA0UFVEJwmMBVvBMznopYZkYrROjNuLdDMedXIIDFsInZb+PCKMaTFe4D+TM5/XwhZS1fKTw/1VqAwlj0weMHOCgXBbz7YVoC3AvW5SwHYE0x8AwUsBRa7qh6BqwV/2NFFT/gLOdHtK5cwVfoAAAAASUVORK5CYII=)"
        },
    },

    href: {
        version: "https://github.com/Kenshin/simpread/releases",
        website: "http://ksria.com/simpread",
        githubstar: "https://github.com/Kenshin/simpread",
        githubfollow: "https://github.com/Kenshin/simpread",
        changelog: "http://ksria.com/simpread/changelog.html",
        feedback: "https://github.com/kenshin/simpread/issues",
        issues: "https://github.com/kenshin/simpread/issues",
    },

    badges: {
        version: "data:image/png;base64,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",
        website: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAAAUCAYAAAAQqNbAAAAABmJLR0QA/wD/AP+gvaeTAAAJSklEQVRo3u1beVBU6RGfuIAY43qtq9lNsjHZ2tqqZFP51xSa0opR8QZUvK94LZoNqdSKF7JABAUHFOVcUZSKgIDOoKMgl+MAIma4WRQXhAG5L0GiRveX1z2Zx+MJCLtLpTI1XfWr93X3193f16+nv+8VhWLFihU2GzduVAowCIA5IOLOZAvMC4bwnElKjziFjYKKdcOGDTAnCJuzwAwRmjXhuGL9+vUNAmBOCMueaIE5ImdCg2LdunUwNwi/RAvMFIq1a9fC3BCiG2+BmUKxZs0amBuCb79tgZlCsXr1aowEiIZr8+LFC/5oovGlS5e4+L5N7NPacUPCy1fPEKqbMuT5/2t8883LAXVE39X//0M+FM7OzhgJEA3XZseOHeL41atXfLx/m9inbv1oSPCNskNQxrghzx8ugrUTvld/r4SCHUhH9F3XOdL5+D6gWLVqFeSIiIhAcnIyjw8cOMDJ2L9/P/MpKSkIDw/n8aFDh1BWVobKyko8fPgQnp6eog+i+Ph41tXW1sLf35/l9BWfnZ2N6upqVFVVIS8vT7ShDksfTVeuXGF78l1aWso2g8WSIyhzrIgQ7TuoaEpAS3cxmroKUNmcJOqoowRrJ/OYKLvSned19FQiIX8u8g0nBb6UEX33t6Idkb4mEOUN/8DjjhxcK3Huo8urPoaHTVeQ+cCVZfH6Oajr0Anx89H45B4uF9iL8+83xgoyPcf9ulmNcN37ok5TshptT++z3Z0qby5Y6d6kIKLn6VvjUVp/TkAUwm5PHXDv/a1Tmo/B1iVHQv4fUd+Zy3Obu4qQWDCP5eoiB4EvFOQlMLRn4nzuJ33iDzXfUihWrlwJObZt2waDwcDj6OhoFBcX48KFC8xT8ZF+y5YtePToEZycnDB79mwulKamJu6KNI8oLCyMdXS0d3R0sJ2vry+ysrJYTli6dKkYlwqW5s6fP5877Ny5czFnzhxs3rx50FhynMz4oQh1oRNKqtT4c6AtPjthi4Nnpoq6f798hlOZk3hMdDlnF887c3UNXrzsRmTKYuwJGI3L2r0oqY0W7YhitRvxebgtDkS8h84eAyKyPhB1cYLub6G28Lg4hl90U2cJ3CM/4PiHIz8U5tcIhTWR53uc/wnLKa7mziHcrfJj+ZdZ0/H0WQs8znzM+mT9QS5Y6d6kIArRvotHLcm4qffG3i9toS4YeO/ydcrzMdC65IjQ/QxPnzcjIG4mz/3LibEI0Ewzrv95C7yjPmF5XIYL6jvy+sQfar6lUAh/6YIcy5cvR0NDA3bu3In8/Hy4urpCr9czT3LSU+G1t7dzBySUlJRwke/evZt9EEn9UVclm61bt7IP6uBKpZIL1DSPCpbuoDSmgqXjncZviiXHifQxIoKuf4S2J9Uoqg0XOtZaBKW9I+roBQVlTOQxkfelCUbdtY/Q3dOCvyfaMh+RPBtVDdmiHZFvotGPMmUMCh8m4YreSdT5JEwS56ryndDV0wxDmxa17VoYWrVobKvAuexfsz61bA/q2nVCB85CfVshyg0alqsLnFFUcRV+141+jsT+mAtWujcpiBo79YjP3I0DUbZv3Lt8nfJ8DLQuOVQFK1FWlQoflTFmYJoxJ6r8VSitTIGfxjjvixihg798jpBb7w4731IoqGv1B41Gg9DQUD6ClyxZwsc38SQnvbe3NwoLC8VOSZg1axaWLVvGeiI63k3+cnJy+Bin4p03bx7c3d2RlJSE+vp67pQ0hwqWipTGVLDUSYcSS47ANFsRfhpbuAZOQlSKI+5WhKC952vuIqTjF5Q+gcdEAalGm9D0X6L9SZ3oI+rWTDyqzxV5ouCMaSL/VfUNxOgcRJ3yZm/82KwVqDDcxmcnbUS4+Nvg2DVbXLz7O7Q8eYB9oVOFbmaDMJUDHhjS2S4ua5XwQ0gU/QSlTeGCle5NCqK0e0rcr70mFN34N+5dvk5pPgZblxyxWU4or0l9TR6XvVLIS4pENlbw/xyn0qcMO99SKBwdHdEffHx80NjYCJVKxbxarWb+yJEjzFMn7OzshJeXl2izb98+cUwUGRnJYxcXF+6QVJh0LaCuunDhQixYsACtra3Yvn07z6OCpSKlMfnetGnTkGLJEZA6WkTE7ek4mToZnnE22B85Dp3d9QjXfsg6ekEn08bz2JhAo01o+i/Q3lUn8uf+m0ATT5RZ7sbjs9m/Qve/muGvfv81PwR/1XuCvgWJ+YtEWUzeLH5ezF6IBzW34H/DKC+ujsH9mjQeH1f/FG1dNQjOnMq8pmgTF6zJR4LeHuG3f95nTXvP2CAl7wiqW9O4Uw62d/k6pfkYbF3y2LS/rp5GocjtmD8hFGZw5jQohfXTvqNyfsPy1DIXVNbl4njy6GHnWwqFg4MD+gN1RyLqisTTk4iKjnjqbvRVT0c0Hc+PHz+GTqcT7Yno3kudme69bm5ubHP48GG+jxJqamr4A47usWRDBUt3UBqTnOzInmSDxZJDedNGRFyuPZqeFAmX/2K0dJVCpXXH0atGHb2gE6lv89jYcYzykLTpwi++VuRNCTTx3M0KPPkDo7XrPoITHIWj2+Y1PwSS+563Q01LFlq7v0L70wqU1cazzithDO6Vx6BKuHeW18cgo0DJhUG6Yxqhs10WvhnadCh9fAEZxZ5csCa/TZ2luHzPqc+a6OkWaY2k7IPC9UMH1T+dB9y7fJ3SfAy2Lnls2p9f9O9R13ZX+Fgq41gxuX/g9QfFLRGuKYW878qGDHie/fi19Q4l31Io6IjuD3QNmDFjBndB4ulJPMlNcxYtWsRHs52dHYOOapOO5tJH08yZM1ln8mNvb88yE2iO1IaKmsYkJzuaQ7LBYslxPMVaxBeXrPGpv5URflbYd9ZK1P3Jywr+ycbxFs+3RPnRq9bY4ds7zzvRGruVvTyRW6TR5y7Bp0dMbzypnz72Aca5u45ZwfW00RfFdg22Eq4JVvz8PMIKewJ74xyOMdr9VdBRvK1evbpPB4lLeyQ7sh9o7/2t05SPN61LHtsrwRouSmMMiuUZb5R7xFqLOSJ7H3X/631TvqVQUDGYG/yTrUYURCMdw4L+oaDj2Nzgd+OtEcVmj1EjHsOC/kEF20jHvDnh2PVRFpgjkkc1UMEqFy9eDHPCUc0PLDBHXB91nP5wYCO8ZCraFvqwMQf4XlNYYE7QKFqEJ/+LzH8AJAsHnUo27mMAAAAASUVORK5CYII=",
        githubstar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAUCAMAAAAQlCuDAAACplBMVEVVVVXVVSvmcjP0gEFNTU1PT09fX1/kbzD2gUJfX1/3g0VdXV3nczT1gkJPT09NTU3kcDE5OTk7Ozs8PDw9PT0+Pj5BQUFCQkJDQ0NERERFRUVISEhJSUlMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBiYmJlZWVnZ2dra2t4eHh8fHx/f3+CgoKGhoaIiIiJiYmKioqLi4uMjIyQkJCTk5OZmZmampqenp6fn5+jUiajo6OkpKSmpqanp6eqqqqrq6usrKyuVyivWCivWCmwsLCxYDSzXCy0XC21Wyq1XCy3XCq4Xi65YTG6Zzq7Xiu9YS/BajvCwsLDYi3Dw8PEZjTEb0DExMTFxcXGxsbHZC7Hx8fIZjLKjGzPz8/QazTSqJDTqJHVbDPVk2/V1dXWazLWcjzW1tbZczzb29vcnXrcrJLc3NzdgE7d3d3e3t7f39/g4ODht6DicjXkcDHkdDfk5OTlcTLlczXlxrXl5eXmcjPmdTfml2znczTodDXoe0DpdTbpdzjpfULp6enqdjfq6urrdzjreTrrejzrhk/rmWzrzr/r1srseDnsez3sgkjs1MfteTrtfUHthU3twant1cjt7e3uejvvezzvfkDv0sLv7+/wfD3wfkDwgEPwhEnwlGHwzLjw8PDxfT7xfkDxoXXxrorx8fHyfj/y8vLzf0Dzpnz0gEH1gUL1so71v6L149n2gkP3g0T3wKL3waP37Ob37+v39/f4vZ34yK74z7n46eD4+Pj50Lr52Mf58/D60r361MD61sL61sP65tv6+vr73s/739D739H75tr759z76N376uD85dj85tr859z87OT9/f3+/fz+/f3///9Ftc+TAAAAEXRSTlMGBo2Njo6Ojo7j4+jo6Ons7CIlfBEAAAABYktHROFfCM+mAAACOUlEQVQYGZXBT0iTYQDH8e/7vs82l6ibYgYWMrE0QaE/VEKXBJMIBKVDHSLoUhSdO3axbqVEERFENwnqVpMIIoIoioIuSRCUFSFWrkzd9u7Z++udUgnhXJ+PQ9Rrp1IjrGx/kDfRzYhKiZXdoc9EROUs5awxraJyopxbRvyHgLKM+A8BZblabswohZTWcmn9UfgrYQv/MGKZoz4XBwIQy4nf8vzRPOnxlyNCrhY1HR5M3ZWumw6vvz9Cy4FjjYqfl9ybEm1Dh9ZqkQ25bdu2ttt1Tnenm9qybZNn7a6mjUlbYkSo5viZTBeC4FlxrFhH/uqGI5eDQAjB/LXG4eE5QgJiz+878f6x02e1e3xWbX1TkP5c10PIiFA8bRMfEaiauiJMJmZ2XhFCCD4lsumqn4R84Mm+7tkJfwe9HoMpZ2raB9uLT8iIUDHiqgqBhASuTAGL8BDEcp4biJAFqkY3bB14VMCPNDSesw09FtZbFhkRmut79X0dAul1/CcgUC5T+6MBQdP75J7HIpQHWqo/PGzNFr/Fsm+/dlc3Z/IQybPIiNDs6ND8y9cCaWTQv40Acan3yzQC72D0wrxLKACyfVHncn39jVPF63avHW8JIGCJ00qJZp2OjgdkEk4u79R8T0Im4fh5x8slycR9xaOUnAQ+vUNN7byZcrdPWGMWdnGvnyVOipLOLi/zMMtqTlCWESUvnsqNe6xGlGVmkoRiMUCspkg5Z002QeUs5SyYwufqWipVZGWjWf0CDsxBCuuBMAQAAAAASUVORK5CYII=",
        githubfollow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAUCAMAAAA+0QoRAAAC01BMVEUAgNVVVVUFmt0UqOsEl9sWqe1NTU1PT09fX18Wq+5fX18Fmt4UqOxdXV1PT08Dl9tNTU0DmNsEmdwFmt0GbpwGb54GdacGdqkGd6oGeq4Gm94HjckHj8wHnN8IlNQIltYImNkInN4IneAJmtsJnuEKeqwKlNIKnd4Kn+ILfK8LhLsLh74LmtoLoOMMoeQNouUOjskOoOIOo+YPoeIPpOcQpegRoOARpukSoeESp+oTouITqOsUo+MUqewVpOQVqu0WpeUWq+4XouEXpuYXqOkYpuUequkgmM4gmtIhmc4kq+cnq+corOcqjLgsntAtntEvjrgwrucwsOo3qd03qt44lLw4q985OTk5q987Ozs8PDw9PT0+Pj5AtutBQUFBmL9BtutCQkJDQ0NERERFRUVHnMJISEhJSUlMTExNTU1OTk5PT09Pm71QUFBRUVFSUlJTU1NUVFRUvu1VVVVWVlZXV1dYWFhYtN5ZWVlZvOhaWlpaq9BbW1tbq9BcXFxdXV1eXl5fX19gYGBgrtFhrtFiYmJlZWVlxfBnZ2dra2tsstFtxe1uyPBvw+pvxOpvyPB4eHh8fHx+yOp/f39/yeqCgoKGhoaIiIiJiYmKioqLi4uMjIyQkJCTk5OW1/SZmZmampqbyNyb2fWcyd2c2fWenp6fn5+hy92h2/Wiy92jo6OkpKSmpqanp6eqqqqrq6usrKywsLC72Oa72+m+4O+/4O/A4fDB5/nCwsLDw8PExMTFxcXGxsbG5vTHx8fI3+rK4OvM6vfN5O7O4+3O5O7O5O/Pz8/P6vfP7frS7PfS7vrU7/vV1dXV6PHW1tbW6fLX7/rY8Pva7PXb29vb7fXc3Nzd3d3e3t7f39/g4ODh7vXh8fji7/Xk5OTl5eXp6enq6urs9/vt7e3t9fnv7+/w8PDx8fHy8vL0+fv39/f4+Pj4+/z4/f75/P36+vr9/f3////zAkwcAAAAEXRSTlMGBo2Njo6Ojo7j4+jo6Ons7CIlfBEAAAABYktHRPA1uO9UAAACb0lEQVQ4y7VUTWgTQRR+M7vJmrRraSRNwD/U2voTaA6mgqJYBBEhIh6KtB4UQaNoa0E0ngTFv0MLHoxQ0GNFKFS0vYiHKhVECBISEZvqzZaIUrSbxHR3ZpzZ2aKRQjeHfjxm3zf77bdv980MQhq+Am4x7lL31jJVLQnMtTF1qWuHCdXj3ta9MYBP7Vse4zaVwrIYw7IZY/ovLnlpDCi9XDVZzSg9MnivwUnHdBGLorriwRLsS1v/V/aX2f1oH3jnRw63sXjF8l5L4sTOq4ydXrEbHe30QezU2WbW0MeYmuTP7Tp5ZrOUiVLObU9cY3tTD26soxSICEm6e2jk5VZ68ZisWBqvOpi6M8ffD9YYS9034NfNxweYJZzE5Ozth4cabR3h6M8PXA/33urK9hIClIdDxqNkx/sYib4mNqRxY84MZoUH1SEQAMgEZ/yYgWOcCxofpbGAghW1LTPlG4o0cT0Ph3z2r9kwtHGt94uUyeYRjGkd75oI/r28pSqDec68YqaOKk6PnR/CKEIMAZHGDkHp/eFXqzvSyDG2x8K2ENsiimOsrItuiLRoBdl6kbWycMuMrTMFgJqZaLPZlf0qUqALJB/P4dzhKVNCtXv6faSz8qFsG77oNh/Z3WcwEp82ROpJeIZ/YqGz7EXCrPzdpDbdT3huAV0gb85PWpPxCUuuCtQj180PtGfTcyg0oVIJBb6FQKSVIvYYISjoZaZrtmxUDCWvCvMmU7wKzNUjHg6hhqZVKvXYMb5gXzpa8eyz4pLb6WnNW3p0mGFdWVJN3BujlcdrOCueuFb+Viu1HJvutWWFZj5FXMtzbk9Bg/wBkWTeHq3KKHgAAAAASUVORK5CYII=",
        changelog: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAUCAYAAABGUvnzAAAABmJLR0QA/wD/AP+gvaeTAAAHa0lEQVRo3uVaaVBU2RV+wYaBmCjjZOJU1kqmUpU/k7/GuFdpLHdFBXcrrj/G/LDUcSGoQUPQCIWZlDNYwdHBYQAdkc1MsyPQsjWLCrgAAg0KCAOoLCL45X6HvGfTpbGtwrFq+lR91eee7fZ7X59zr5Ta8uXLPdavXx+qYFOAK+CdtPLvOmzj0stCtdhYD43krlu3Dq6EcallLgHvlJIQbe3atc0KcCW8nVLqEvBOLWvW1qxZA1eDt7nEZaCtXr0aroaxX1tdBtqqVavgahjzn2KXgbZy5Uo4i/7+frmkvErOm8Tg4OBz7T+8VOQUKM7GjgT6Bp/iXdV1I1lTW7FiBZzF1q1b8SrxrwqOz5GsR4KfZ/9BcqFToDgbOxLoGxjAjy6NbE3Nz88P9uAt02KxoL6+Hnfu3EFRUZHhYwfzkkKdEhUVJXHNzc04cOAAkpKS0NDQINi+fbuRR0lMTMTly5dx48YNHDt2bJgvLi4O+fn5iIiIEFtAQAAqKytRW1uL6upqBAYGGvG5ubmoqamRfQsLC7FhwwbDFxISgqamJsmLjY0Vgh2fjxidVDAMf7RUoqDjIa51deOqwuwrlWKn+Fc2iK22uw9+RbeMnJimNpR0PpKchHvf4Kdmq+GjBFQ1SIxVxdjnrbXexs2HvWI/eMOGgadPDV/fkwG8kzyk+xTeRLmqff1BN7LauvBBZrlTNRyh+fr6wh7BwcHIy8vDjBkzBIsWLTJ8JJhnGHVKWFiYxBw8eBC9vb3Yt28fpk+fjhMnTiAzM9PIoxw5cgSzZs3C4sWLcf/+fWzevHmYb+bMmZg3b54QVldXh2XLlkltEtLa2irdzXjdTvAHceHCBbFv2bIFXV1dMoLpO3XqlBDs+HzE9xPzDfxCEXO/7zGmfB4Hz79/gtHBn+K98+nio2zLKRH77/8djYZHPUbez8JjxE4E5BbjHzdtho+y3GyBZ9gZ/PaTL4y8X6dY0dLbh/c/PgNPtc9HljIMqLGs55HgcUn5+JWKa1Pf6YPwKKn/oTkHRe1dTtVwhKb+kgV7bNy4UTrSbDYjNDRUCNV9JJgvkDplyZIlopOUzs5OLFy4UNY7duzA9evXjTwKiaG+dOlS6UL+kHQfbXos7R0dHaioqBCwjs1mw7Zt28QfHh4u3V1VVSWdXFBQIPajR49KXR8fH1mTSBLs+HyEV8IVA75XKpBWUw/PqJQhW7wFXnE5olO8P0sQ3TM6FT1PnmCMIoDrP5feRm77A+QplLd14FJdk1GTMiby0tD6XCa6+4fyVqi94quq4XU+S3zjT8cLOXoeCX478Qr8VFxKdR28YjPEPjriIh4PDOLHany/rIYjNL54e5C02bNnY//+/TJW7927J91DHwnmGUZdJ4b6pk2bpMv0Grt27RIS9DWFlzN9TVI4dh3rEIcPH0Z5ebnRpcTUqVOl83fv3o3Gxkb5IdHOiWG1WiUvKCgI2dnZRh1+ZxLs+HyEpyJRx7L0IqTdaRxm00HxvJhrrB897od3ggV/yL6KW50PMT7sM3ioLvKJTUZGfdNL8/wyixB/u86wj0+0CDn6mgQzzjejCCm1NsM+WuGxOp/fdaKGIzS+XHtwdLJrOS7nzJmD9vZ2GX/0kWCOTOo6MQS7ngTr6507dwrB+ppy+vRp0dmJ7HYS4FiH4ITgqD106JBh27t3r3zynC8tLZUfIddZWVlCMHXeDVpaWuSHxDWPDxLs+HzEWxfzDPzky6/R0t2DyYo0rvky31PnIHWKfSyJGpuQh3kZxciua8RbX2WLPbqmEelc/y/uRXm/jElBq9rrfXOx2D+6WiPk6HEkmHE/jzajracXv0srEfuHpdUosN1V+11+aQ1HaBxp9uBL5BlI8LJ08uRJOYfpI8EcfdQpeg5HNAnW1zrB+poSGRkpNdmBe/bskY50rEPQzts6xzNH8927d43Ru2DBAqSlpaGkpAQ5OTlykSLBep6/v7/sy/P/7NmzQrDj8xEecbnPoEbotIgYFLZ1olJdaK51PcLM7DLxUexjSdSY+Fx4fZ6M6IrbMDd/g2hbK0KLrwnBetyL8jzUyF19Lhm31D5l6oL0N2sl2hWRehwJHorLxMKzcSjveICqBz3IbGqVs1ziXlLDERq7wR5z587FlClTDPBipPsmTpwoL1LXdTtH5qRJk4z1/PnzZazqawrrsN7kyZNlMtjXdPwOej5jCY5j3UedFzl+8mI2bdo0w8e6zKOP+z2vNuF+IWc4FGGmw/+CKfCfMB36GO5nksQ+am/wsDjTX47CXXWtu+ok07EImILDhz6PR8KkLkN63AvzlD5WnZmmvx6Xff6UakHyzZpncf7P4txPxUuMKfD4UO2oVCPu/9VwhEbCXjco38Y+zsJEgt4QgirrYVX/JGP3pTe24Deffvlaa2gcv68bEyZMwLexj7MYdT77zUF1u5uaFG6qM92CTmDUF+bXWoMEt3DEuhLczmW5Br7KbibBoby8uBK+py4xrgC381kh/EOHh3poktzGy40rQIvJ+G4jNrNNO5ch/2XnvyqleyAtV3GuAAAAAElFTkSuQmCC",
        feedback: "data:image/png;base64,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",
        issues: "data:image/png;base64,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",
    },
};

export default class About extends React.Component {

    mouseOver() {
        $( event.target ).css({ ...style.share_icon_over });
    }

    mouseOut() {
        $( event.target ).css({ ...style.share_icon });
    }

    render() {
        const events = {
            onMouseOver: ()=>this.mouseOver(),
            onMouseOut: ()=>this.mouseOut(),
        };
        return (
            <div style={ style.root }>
                <div style={ style.title }>简悦（ SimpRead ）</div>
                <div>让你瞬间进入沉浸式阅读的 Chrome 扩展</div>
                <div style={ style.badges }>
                    <a href={ urls.href.version      } target="_blank"><img style={ style.img } src={ urls.badges.version }/></a>
                    <a href={ urls.href.website      } target="_blank"><img style={ style.img } src={ urls.badges.website }/></a>
                    <a href={ urls.href.githubstar   } target="_blank"><img style={ style.img } src={ urls.badges.githubstar }/></a>
                    <a href={ urls.href.githubfollow } target="_blank"><img style={ style.img } src={ urls.badges.githubfollow }/></a>
                </div>
                <div style={ style.badges }>
                    <a href={ urls.href.changelog    } target="_blank"><img style={ style.img } src={ urls.badges.changelog }/></a>
                    <a href={ urls.href.feedback     } target="_blank"><img style={ style.img } src={ urls.badges.feedback }/></a>
                    <a href={ urls.href.issues       } target="_blank"><img style={ style.img } src={ urls.badges.issues }/></a>
                </div>
                <div>
                    <a style={ style.link } href="http://ksria.com/simpread">简悦</a> 的初衷：还原一个干净的阅读空间，提升你的阅读体验。<br/>
                    截至到目前为止，简悦已经适配了 <spn style={ style.stat }>{ this.props.site }个</spn> 网址，详细请看 <a style={ style.link } href="https://github.com/Kenshin/simpread/wiki/%E9%80%82%E9%85%8D%E7%AB%99%E7%82%B9%E5%88%97%E8%A1%A8" target="_blank">这里</a>。<br/>
                    自从 <span style={ style.stat }>{ this.props.option.create && this.props.option.create.split(" ")[0] }</span> 安装后，共使用了 <spn style={ style.stat }>{ this.props.option.focus }次</spn> 聚焦模式，以及 <span style={ style.stat }>{ this.props.option.read }次</span> 阅读模式。<br/>
                    如果觉得它还不错，希望可以给我 <a style={ style.link } href="https://chrome.google.com/webstore/detail/simpread-reader-view/ijllcpnolfcooahcekpamkbidhejabll/reviews" target="_blank">投票</a> 或 <a style={ style.link } href="https://github.com/kenshin/simpread#请杯咖啡" target="_blank">请我喝杯咖啡</a>，这是对简悦的最大鼓励。<br/>
                    通过下方的分享，让更多人知道 <a style={ style.link } href="http://ksria.com/simpread">简悦</a> 的存在。
                </div>
                <div style={ style.share }>
                    <a style={ style.share_link } target="_blank" href={ urls.share.weibo    } title="分享到 微博"><span style={{ ...style.share_icon, ...urls.icon.weibo }} { ...events } ></span></a>
                    <a style={ style.share_link } target="_blank" href={ urls.share.douban   } title="分享到 豆瓣"><span style={{ ...style.share_icon, ...urls.icon.douban }}     { ...events } ></span></a>
                    <a style={ style.share_link } target="_blank" href={ urls.share.twitter  } title="分享到 twitter"><span style={{ ...style.share_icon, ...urls.icon.twitter }} { ...events } ></span></a>
                    <a style={ style.share_link } target="_blank" href={ urls.share.facebook } title="分享到 facebook"><span style={{ ...style.share_icon, ...urls.icon.facebook }} { ...events } ></span></a>
                    <a style={ style.share_link } target="_blank" href={ urls.share.gplus    } title="分享到 google puls"><span style={{ ...style.share_icon, ...urls.icon.gplus }} { ...events } ></span></a>
                </div>
            </div>
        )
    }
}