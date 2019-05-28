
const cheerio = require('cheerio')
var request = require('request');
const moment = require('moment');

const domainContest =  'http://ktdbcl.hcmus.edu.vn/index.php/cong-tac-kh-o-thi/l-ch-thi-h-c-ky'
const domainNews = 'https://www.hcmus.edu.vn'

const keyword = ['lịch thi cuối kỳ hk', 'lịch thi giữa kỳ hk', 'lịch thi chi tiết cuối kỳ']

function getListContestExcel(listContest) { 
    return new Promise( (resolve, reject) => { 
        listContest.forEach(each => { 
            request(domainContest + each.linkHtml, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    main = cheerio.load(html)
                    main('.at_url').each(function() {
                        const linkExcel = main(this).attr('href')
                        const titleExcel = main(this).text()
                        const excel = {linkExcel, titleExcel}
                        each['excel'].push(excel)
                    });
                }
            })
        })
    })
}

function getContentArticles(listArticles) { 
    return new Promise( (resolve, reject) => { 
        listArticles.forEach(each => { 
            request(domainNews + each.linkHtml, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    
                    
                    var $ = cheerio.load(html)
                    var content = $("*[itemprop = 'articleBody']")
                    content.find('img').each( function() {
                        var src = domainNews + $(this).attr("src")
                        $(this).attr('src',src)
                    });
                    content = $(content).html()
                    each['content'] = content

                    var time = $('time').attr('datetime').toString()
                    const create_time = moment(time).valueOf()
                    each['create_time'] = create_time
                    each['last_modified'] = create_time
                    each['author'] = "HCMUS"
                    each['department'] = "thong-bao"

                }
            })
        })
    })
}

function getContestSchedule() {
    return new Promise( (resolve, reject ) => { 
        var listContest = []
        request(domainContest, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var main = cheerio.load(html)
                main('.items-more').find('a').each(function() {
                    keyword.forEach(each => {
                        var title = main(this).text()
                        var link = main(this).attr('href')
                        var contest = {
                            linkHtml: link,
                            title: title,
                            excel:[]
                        }
                        if ( title.toLowerCase().includes(each))
                            listContest.push(contest)
                        
                    });
                });
            
                getListContestExcel(listContest)
                setTimeout( () => {
                    resolve(listContest)
                },2000)
            }
        });
    })
}

function getNews(){ 
    return new Promise( (resolve,reject) => { 
        var listArticles = []
        request(domainNews, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html)
                
                // main('.sppb-article-info-wrap').find('h3').each(function() {
                //     keyword.forEach(each => {
                //         var title = main(this).text()
                //         var link = main(this).attr('href')
                //         console.log(link);
                //     });
                // });
                 
                $('.sppb-article-info-wrap').map((i, card) => {
                    
                    const title = $(card).find('a').text()
                    const linkHtml = $(card).find('a').attr("href")
                    var article = {
                        title,
                        linkHtml,
                        content: null,

                    }
                    // console.log(articleLink);
                    listArticles.push(article)
                })

                getContentArticles(listArticles)
                setTimeout( () => {
                    resolve(listArticles)
                },2000)
            }
        });
    })
}

module.exports.getContestSchedule = getContestSchedule
module.exports.getNews = getNews