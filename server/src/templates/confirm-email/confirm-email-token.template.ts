const confirmEmailTokenTemplate = (link: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Email Confirmation</title>

<style>
    body { 
        background-color: #f5f5f7; 
        margin: 0; 
        padding: 0; 
        font-family: Arial, Helvetica, sans-serif; 
    }

    .container {
        width: 100%;
        padding: 30px 0;
        display: flex;
        justify-content: center;
    }

    .card {
        width: 480px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        overflow: hidden;
        border: 1px solid #eee;
    }

    .header {
        background: linear-gradient(135deg, #9b59b6, #8e44ad);
        text-align: center;
        padding: 40px 20px;
        color: #fff;
    }

    .header img {
        width: 120px;
        margin-bottom: 15px;
        border-radius: 12px;
    }

    .content {
        padding: 30px 25px;
        text-align: center;
    }

    .title {
        font-size: 26px;
        margin-bottom: 15px;
        color: #333;
        font-weight: bold;
    }

    .text {
        color: #555;
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 30px;
    }

    .btn {
        display: inline-block;
        padding: 12px 22px;
        background: #8e44ad;
        color: #fff !important;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
    }

    .footer {
        text-align: center;
        padding: 20px;
        color: #999;
        font-size: 13px;
    }
</style>
</head>

<body>

<div class="container">
    <div class="card">
        
        <div class="header">
        
<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAAHtgW46AAAAGFBMVEVyWLUGBgwoJUpwYMBtac1qctjr6ffNiMkjVGnbAAAAA3RSTlP+Aja4oG0fAAAACXBIWXMAAAsTAAALEwEAmpwYAAAXg0lEQVR42t1d6Zrktg1EgUrm/R931g1WfvACT6l7Jna+rO317rRaFIi7AFCAbH5dwx9p5a9AdwVFRNKHOn+Qf6buRiIQESG0fnKpiBDMtyZCXid9AwIRiUIBRaJo+4DlqQgRlCeggGkRCSIUQ34oiopGpoWDiQWDyiXC9FCimv5gQQKBq66hmUoLYiIqQikfABLKB37fur0RAQLYdklERP7k3UGhg7F9QUS0/UXF/AcqFBFSRF6sdxIRAhKEYL1p/ppSRaKIIH9g7TFVhDHdTUQsmIjIl6hIgEjmmIiJJpKURQ4Af6f0eWYjJIbyYXrcKjtIT1J/3j45SeKVtnQriWD5LH1ySftACKufXJ4/IpSY+XJp25AkqZo+ufLzCkSFaEwpd6KmT5lZrHkRaPom9RKKk1ERCRIlSsiPEZv0iomKStuSK6sM05PpK/MpPwHBsu8QscRArSQy/25BgiUmJdFVJCrDvy2zCQTT85sITUX+nbb0YtM1S0vXPWAW3Ij8wZ+iGNC8jRQLlXMQFcakchQLVkU0yZumjyxYWvOrcg4ARSxkCc2SqSLCyCq4iZLGn+jlPUlwluvEsnb9WRLlgbFc/GDQtsUq/eUgpGhv5PIrl7/ci7IQBON03SUah2dk+x8oik51xhWYpYl5wWIW42DdZVCIxCDUbyJf3alhsVYoEh+L9rHYsOj8QfqClgtVRGDlMaxqhkEAZxvK3dMjx+wcmllPTw0g+EdCsqjVMnoFMBEJhrQKQcnqlE0A8u4aKCImQcSSAkIFQoEAQqJxzzPHskfJMn0VWQW76+n/F6qHcvYS3hNLZChaHEQkCMwJ55UlqHsitSKGoVuzeBXGcr0zEUXqo8y0XSKMWmTLABTpExORl8i/O2+HLDDQIniokmFtW/0js6p4shvNxZqqkRIslJ98WS/DTKa4rRAK92xYwmtllV4xCWKyfKbe9hTiTBlaRNGbsLVRgsALR+dKT3YMk+DcfuX8S+Xn1lIEwVkb4+2D+evTD2jHr3QLsMnCI5ucwkkO8dT4Fc/Vcu1qofaVYSOIniuv2SVd0/U9J1nV7VoY/hzkcjA05T4tfDcV5x2LScyRBIFKqzYTHzvZrB4jfchg0n0ldK6iXhxatIJXqBdj4ocTZYpk7cZBLEGs/B+bVuiCI+NfHbsxuzxo8ivFzxDacT4mS9QEJSc8TCFX9WbtO5Yd5vgNoYhExDiJq0mg+NhxolvIzlibBAmeFkJYbZUKtVkmc/YNoi5izaE3y8+gDFa8rZhkew5cLaYYPFOnJhaSyVVejg6w+TOMDArZ7sa2BrMIc2Oo8jekxdECoCZC8+UmIViOArTmpiScVNB930IJMkLalVBDrkQGMZFv3nHgYpPVIoD+8ertzXnkWNPs8r/qYJGfPoi5ID6kx0DHD0pUEbHYTIPbmRzzDE6Hg03tPdrK6Uw/QudlBbEk59Ol9cJvr/g5IakBa3dlsD+jQWbJ5wsJMYpEH5DIHwj+WGddABFoFeWFrEzOX2u8nZ4L/mJbfSPJGCWb3YZ3mASx0NtRcTl2TlObp3OPlMXrS75LTJIejFF6yU+PFBwx9RtVRl7+qZLWds/UvlGNhb6aUbKitRY60tE7PrS7tDzSq4lydq8+IJPDN7zpK0yxkFRqF19pb1CrJbEODOnk4pIpPjAJZgf9mKM+8fG0LnRiCuFAWQQmP4z6fiXo2/yC9s/DKHz61XtKwnxJhgrT75E/owRB9gvQQ0D2GSWrBfLNUU2R5zLjm4usV0h2brB1D9ZZLrLZw8aJjEqIgzHL5ysOLbh66WmNLh1Cj71kXJO3lOypoI+/2G8TcgCbbM24a9firypjFl0hCRe/zsFqC5K0j2g6SkJ1+nHBC2dFZRUXFfg2vKQ3Tt0iZ36LhO7G0W1kt4/29Roew1n7o15wZl9suzRgaAV7m4z9cg0KhMj5BbYqwArYw8euOi6yXgOkgBzjhpEVAFotY+GudLsGO00ARvPEAiULcwbBTpfM3R1rnhNCVLcbM5qFniMUBJc0e81JIYJJqztMdCR2e39XHV6gExy6L8Z5iWAt+lqwmxzAhRaWQWIsW4QlTGI5oAoSkoQBIyE1cek8N700wQoC676JV09FRijJeZFso8b8CzbZucgc53a7VZdIEaIFyyhbmMxgF5mRMmp73Rgk3s9USEX4lAMM7EWQcGjnmnnWW/VuiRrtpUUyJY0XHPyd+EqX9Bm1X8JHti6ghFxFT1ErnyVZdSs5WSM4wxjS8gCbo9yCaAKeFxNwhB5ZxG6Jks5an65oyWpq7ozRdXjDTlLIwZlkQUoSbWa2sKII9ER4xxpavreKOCyVsJIEW05pFgAtIBKqPneue7htHOULsb/gTwOmh7wjpKLVwmGE8alrGSWtGSP7S8KLSmEYsOOsjOl+o+DqOVNdPIf8CfNFWvJmq7HMD3ME20PMTJ6nq3tMy8VxQ+cb/lndv5r6IfrnmHDVv7HXaLtfw5luz4FaTIMEbp66GZCLhyWqGha50s5IFn8BGQooPt1t5iPsmMEhMdcBica6tJD93k3a06fmrrSiPlqErMRaegwh696GjpZpuxJ+ZOYHOxSPIxX5lmZnwVVZ2Q4keKOA/ZhScivVprDdq6/vr++KlHCh1ySjVV6Ag7Ik9CiISAIzw5Eb6r89Rj6CTMFMhXesPah52KkNiCExCDgJrdf0YOc6Fe/SuUXel/Si+qZ3l1gEIaRQGK0T08TycKsdqrrA87d5fPrNQglCrAfzNraW7yEScKGjMyHhaMw/AnDgTHBYYIBbTOxNlKivJcUVL2d5/whU64CCx7f+m5E7lf+XRR5jkBgt4gNY8D3Ghx1kZPydRXZwSLGge1Tw8SIz6NbbpqmB6f1FDhzrMZvzMqdFrg1qBLdEVcjTMvtFAo7oF4ZFTstsrXB4hKd2lmUrAptFjupTWD/46D0x60Wue8x2hOlOxKwWwTHaKYjgwghTsFxlwd7DGgv8ucd1BconBjKEHQrYwECswEKsc7w3EO4eo5e9Bq2iDb3JNXf9LRi2rLnOPkleLRKw3MIxbcUsYjXPBKYbLFqMVOSle2qWousXBPvy97BIkiuVRUGgAJsccM+h7FCZFrfbFUrl1hZOSoQtPxsElUKWJmSECRF4UBCo+XAntnHiWYbILpHXUJbQvXL1PB9VI8yBemHM93i3dSfugtuQYYviupqGivnFhVk5Vk8EB1MmrjkRXFyqx82q+rEAd1ALAqlFLOWBXG2/HlUdHEY5ltYqgceUHsh0q+iZ68gA5W6nXKqODDZhJiVgy5HaX1z8x0hlX4TC2g74Is1ur2pvy3SJ1VgCaE8BLjyO7jlCdL2C62aozA9gLja1Va4tIUTp8ih6hhWSF1wMOW0VXCf/ruyO3lJx0f9aa2Jx+bA8ppWdqSp3b0BwTOm+A5mwvJFbBDfRT2tqiRSR2gOI22yqda3Nu+XC3dEVRoHlHqThzthCuNd9FLfaB2z3f1gB3EfuWyWvmo6HaDRq2/3ClnAd+wQKteJth0zeHBbTF85cfNVtCGx0PpGDEpfaWbdZoZZFpjJj3Sv0qtez+QU26HmM6KzNeLEf0ph6a8qTR3XTTm0VdXCI7fZsrjO2jorcJRAoiLvybdqiizK2mXfI1bKYiTW6vVglEstOK+vgN4iEbKg3+nFUNVCwKAdaKq0FJuOZ+IFRdmtPNLd+p9XAZh0MZQjG/HjKIq/lrums38IoMwQupQ6R/wg6Spp+5FyNt9WnVVHT0dH6Z2sKVXpsmIv52FoU7gtaCaUOoZfpVvv1ZmJ/q2VV1hl2W8GuWra/RjY4xot7W2WtsXGsF1x1crc2JeHAC3Yfo2/f7ho1hy5gp3vAKubgNNiQf726KkFJnoMMa8hV+7gn3McrnWvs4N7NBlfur0yhyFXi3WXYVHq1mUZnF64wt2IkQ9/a171ZoWvgnuPE0l1JxRKlgErQ2iVjIUjXKO4fFhJq3im+BtSbRCq3Fc1WSFsUDNDXVNiB48MtomHu1e/ZEoLMhGiywm1eD3t8JlDiVF/uab2irTra8zQaGraELegS4Zs+bBXpvHb27RKRqGxZFU/+g/HYh3/E6jFmI2+axkeLtI4zvGfa7yGmcvhAbe+RJRC03x/sCtzjd1Q2u3BfCbfX029p87XHO8b7zbJteSZNiLyGvZjApKEzcNHnvqGCjRIdnhMyzSZMLLHSUSenJgmXx2NRwEADEzE9pCmFZItd8eeuRwJzgJjj1cCCWmNnHy+K8K8njRjQXWutgKv7t0nmQ1G7WN+ASeh9QLTezNLlRUqg8lxubWABHe7b2iQSFZs4MjwvL15zEphtLejaXCde1CaAc+mgd+NltiuPhteccG6XsCEOum2Ncaes5DQODhetO7kNFR/WYq/G96hoGSlluVm5BcDuqOh1153Ggaji6KDD31cs9/FP/fVVx8F0TRRdXyo2be0hiEluQlyQ8pX/G5o+rq60P8bssxpKqB0ZtuDL99eqsSSgX4V+UHfpg0mqcdN1+5XFD6fShoexb/NaWXYsLbpLgCnHqdzHZtbvVq70UHWoSDh4Q8ddp88glAGP4hFTMdb8XJRvdeLM3MWM73Zpzk1X1KoXZ1Uk4xjTWk1p7QE75H6SZtUL28VT9vYa69rvzBwrKdr7zV3HQxYwb5i9J7k3i1AgEkObiwj36xy6o7btCxCRGJyKh7sOsn3Mf52q7u18jKFVftNMy/faLRr/o6YI0xh2k96Km9TmOnu2So3deVn+pM0HiwLpsAJ/qytKd+1wTwD1J11RODZl8Nfa4cAplH2j6e5v6bmT/5eWO/mfGi1+7xdqyutUlZSfDzr8LaIF0af3m4Zx/jcIwR0BrrpUW/bSYX+/RM/PRQvh8aW+HpdGvZjdSPyxxF1/Cw30BSlUfuTGfeQjPyP/CULeYMQ0ES6VhnKYpKCc2cO/k5C3iNg2AFckJc0Uo+JuHxFz/Y1UDPOPTF01lPJ/59vep+X6b1NRm9uWKO0Gf/qAluu/y4tidZO20+nGASL4iJbrv6lNhDtuc3k8GHhO0J97mYexFq636aA0cLTf9lrc35RjuxMeA35xnwM+YwaaZC1Pz9j0EaC7gz4ZbXjEkXDhs6CxnTYHbtX8mOnkIDPoLxByXfjU1p6x22ORrJyfWsyD6g8JCT8KYeiLlaxYv0PNb5LRFsjIHSnXI3urh8z9tnFulC2QW6FqQTJG1YLeWLiDpero+H6iTzMMqAqFIqDIPCjPK6+d19FTrrB/uCuMEOP3Y3YwbaGizowSUA0HjM0f17NqrPItHj8Y/4mXfP/rUSxV/930NnE32uETlS7MR5DcoIBt8/CWI1cYG8Pivx5Ildv/3QbpjYo311MD/TQCgf0NtoTg83AkT5+ehHk9DJVLWqvOw2+R79DiAcUvjUqd01h35LbsuxFkL2DdP63jtpv64iOOhI8SDriecX3WYDIFYODsTrk4zRKPCHnTk7v2nJq78pmNdsaJ2wb+ZW12EbPob0Trb4xFd3gd+lKWU3DcdfTcTZW9Twf4MRKJEsnnoKqTMWzOg949uH5OB0fTi1UGeJbGTjcWX+W+NUlPhFy/gIzc1jO832ab43Fm6q7skkpbhyMv3k6gSjNQ9HQIiFPfjQ1ju+UEmtQZ72CiPWfzuTGb2bh3/QfG2MNLxtYlxpYyElMEwCi4rR7VIzK4ft3Ge3QsJngI3nn32NQC60CGcdu40HFjpETf6ZTaxRllIzpIgYx9bgLGDqsmVqKMi+70uY16yPz+COATBdmoAJaV2eDnb1thgQibu7xE7rmRfptnFZ8XSg6hNFcyh9lkYRsxHe3Vqg6PZ5OdG1ABbyWJD2BgeTTNFUyCdb8tjviE/EzT5TRLO8ERyVa/c5eJGxYsWHAdmnhTQ3KB40n6t2jxdPgpsYmSI8+6kWkow0Ro9YiHGuKOe99AnexAh9mylR8W58lndFg9LC1Y5UU98RG8G+fdZbPpGVaWM8MLImGPd6jmmZywvGh+v0rTjUxL5UeXpl3HRHgFltXDc3wckmbzAKqkUcnTjRQxdUu/nPdZUyEW0s4HC+WP9Ux6k8n/np16S0Klq2Byhb7ps7Aetk48drpRfYdnSfrXnduPW2wEfYzNrV16hJyn+UY+C3IzN7xyjG+4aH1pencuCycXsCsJ4GmHwS3nCguk54brGUzTirG9EQbP8dxcwdwjhkdMeuo55BGjcNapN7k9BOreUomPMll80qI/vuXxbjplyY3wDvZbzrCeM1jugxGufAuX4dkDozA6jsyN5WGJehsv9b0W68BQjthy+U8+iK46/e4neR9yhMPQ2vKI7flM8t/61Z/wmF1JlbkNR7Arm41ixTb6itUB8r9IiJcfuzl6c+4U5QEYWYM5DgvhPCCfZ4DKH/gU6TERCx/0NLIcFlwkBG+lC3Tt23xaE9lB2db7EOfAb2hzgzclBEFXoji1xqLCQdyeVr3bevPj0PkRXu4o88n9jaPafmabbeCqfxHbYHHruM9IA/2xaCbvQ61XB9YFkevVQpJeW+w8ZHD1GoH+NHYfGA4jLrNfUKHyDZmGLaYPGEJ89SFusMfdGUhmHkORZcgEcQSD6nAA4119BEZS9wlzEBMlA9Nb4xjOG5Q2NQ9xUpNuoBOqdenpmLxECsgTPgGLd7mcSnq3qAWTcDf/rINorYSKeV6813Ocj9NI7QBxzTbGRy0XQWpo8tiDop7isxeqd+JCjSjH1ZFs3AOjdyXXkyhLyYeOsL01gaO93aZvfIB71dAgxs/Qr/LuDbOn9eQ6KvMXH4VUzzpp0EYm8Mlc+yGmmtXJw0Hjexy5jwyfeIiMp6/BaHs0LPt27U/r36K0d0DuQkA8FYoeB5vH6ALfbM65nYNTv2g7jfcQlJ+jMKT92FzUpgHj+S5/yceDMLw7QqFGyHY6qul12FI31GjuBb+Lu3w/Z0g9EgVesmX/Qqo2uD+8pqhzh3Gf5puqlNcEWxD5a+tK7K83uIC5vHNIjXwndXq5HjZkYEOH5VY+FvzJgrzWLw56vdHq29xFfypW1F0DK9F3hsQBmcrI4QaZthDmsyMsmEm4uru87IMDWBYvr1ymE1i+ZpnyQn/q7XaAypFRy5gtbXojDJlTwuVLMobzVsd24mSM2Pd+HoOZ+WC/Fn8MYVSQD1LbzrTqdNL68WTFEeTyGNGNwW2vm+1QKkvZ37tsuWuqGXiCZpWXQxPg6fDIFRkNb0sY4vq4qHflaj71yr/wqj/yFftGV5Yen4NQheHYCws/HQMdIDdd+L3YHYnbetT7jknwHFEsufEOUvUWHfPJO0IRvgRb7XgWqjQygvkybIeoP4xwn9CxeRGhRjdQMFmqsa/0xlL1JrYiJI8I+Pr6+pqKkMIFlKsbFY6vNobdKTpd78LwPsGBG9a/A683VfKMDJFv6UnRjTDrDr/W2Pe5TdCpbHpfbDz3wBdqqlA9oeRr+kOaWVhGD3oojcROK7r32nKn5ObeRZhwTnNKkmo0VX9uqPke/6AquzhP9FhUeJ0w4L3fyHXx0jLiy/vNczxQk++BDjnMAe0LMImGeLFO1tSSNrfVy6bOYz3ZnU75meHV85jQXelN4/xyBOJkcLeV2PAW+DDbqnMtSW+7QRmtDlTs/V+V+00lNvzEAWYdx4cTPTV1V9pNGtzcnwVXJpv8RviMGVnH+ZOpt0LK6bgGn4svOpHq04dPhEr1ftbv2RxiCbVo917cdgXlT3XjKRnPRlwzHq6k3Xjx4J2DPa5tnGRqeoPoT89FISXRsnN/rbTU1D0UPO59bqjqm1Dd8ykJmWjp3N9kmyphb5OhNRThUwT6rY4EF/3OJ33N7u+dytni8CbwnZkOfQ9or+UjDkK2dPH7SuyeE1pOCATfKgfoB2WDTIuyUGNDx0KwpydUrol4rOE/PQTJLaMk2WJc13T4Jg3aBpSEf/ORO2ODRMy++w3d0OVLBv+Js4PGBPLZlLVuXpT4DxLikYmfH/Xyj5/m1OGOjyj6NQJ+98Qzur4blhf6kqR0/1TznY+m4Yf11tWv/wB+d9SABmtWCwAAAABJRU5ErkJggg=='/
                alt="Social media Logo"
            />

            <h2>Social media App</h2>
        </div>

        <div class="content">
            <h3 class="title">Email Confirmation</h3>
            <p class="text">
                Thank you for signing up!  
                Please click the button below to verify your email address and activate your account.
            </p>

            <a href="${link}" class="btn">Verify Email</a>
        </div>

        <div class="footer">
            This is an automated email — please do not reply.
        </div>

    </div>
</div>

</body>
</html>`;

export default confirmEmailTokenTemplate;
