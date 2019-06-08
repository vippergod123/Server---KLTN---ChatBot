
const cheerio = require('cheerio')
var request = require('request');
const moment = require('moment');

const domainContest =  'http://ktdbcl.hcmus.edu.vn/index.php/cong-tac-kh-o-thi/l-ch-thi-h-c-ky'
const domainHCMUS = 'https://www.hcmus.edu.vn'
const domainSubjectSchedule = "https://www.hcmus.edu.vn/%C4%91%C3%A0o-t%E1%BA%A1o/daotao"

const keyword = ['lịch thi cuối kỳ hk', 'lịch thi giữa kỳ hk', 'lịch thi chi tiết cuối kỳ']


//#region getContestSchedule
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
//#endregion

//#region getNews
function getContentArticles(listArticles) { 
    return new Promise( (resolve, reject) => { 
        listArticles.forEach(each => { 
            request(domainHCMUS + each.linkHtml, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    
                    
                    var $ = cheerio.load(html)
                    var content = $("*[itemprop = 'articleBody']")
                    content.find('img').each( function() {
                        var src = domainHCMUS + $(this).attr("src")
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

function getNews(){ 
    return new Promise( (resolve,reject) => { 
        var listArticles = []
        request(domainHCMUS, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html)
                 
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
//#endregion 

//#region getSubjectSchedule

 var  getSubjectScheduleExcels = listSubjectSchedule => { 
        var promiseArray  = listSubjectSchedule.map( (each, index) =>  {
            return new Promise ( (resolve, reject) => {
                request(each.linkHtml, function (error, response, html) {
                    if (!error && response.statusCode == 200) {
                        main = cheerio.load(html)
                        if ( main.html().toString().includes("at_url")){
                            main('.at_url').each(function() {
                                const linkExcel = main(this).attr('href')
                                const titleExcel = main(this).text()
                                const excel = {linkExcel, titleExcel}
                                each['excel'] = excel
                                
                            });
                        }
                        resolve()
                    }
                }) 
            }) 
        })
        return Promise.all(promiseArray)
}

function getSubjectSchedule() { 
    return new Promise( (resolve,reject) => { 
        var listSubjectSchedule = []
        request(domainSubjectSchedule, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html)
                    
                $('.sppb-addon-content li').map((i, card) => {
                    
                    const title = $(card).find('a').text()
                    const linkHtml = "https://www.hcmus.edu.vn/" + $(card).find('a').attr("href")
                    // var article = {
                    //     title,
                    //     linkHtml,
                    //     content: null,
        
                    // }
                    // console.log(articleLink);
                    const temp = linkHtml.toLowerCase()
                    
                    
                    if ( temp.includes("thoi-khoa-bieu") && temp.includes("hk")) { 
                        const subjectSchedule = {
                            title,
                            linkHtml,
                        }
                        listSubjectSchedule.push(subjectSchedule)
                    }
                })
        
                getSubjectScheduleExcels(listSubjectSchedule).then( data => {
                    resolve(listSubjectSchedule)
                })
                .catch ( err => { 
                    console.log(err);
                })
            }
        });
    })
}
//#endregion
module.exports.getContestSchedule = getContestSchedule
module.exports.getNews = getNews
module.exports.getSubjectSchedule = getSubjectSchedule