var questions = JSON.parse(localStorage.getItem('data'));
var nextBtn = document.querySelector('.next-question');
var currentQues = 0;

var userAnswer = [];
var time = 1;                 // mảng chứa các câu trả lời mỗi lần làm bài của học sinh
var score = 0;



const app = {

    firstRender: function () {
        currentQues = 0
        app.render(
            0, questions[0].questionContent, questions[0].answer1, questions[0].answer2,
            questions[0].answer3, questions[0].answer4, questions[0].correct
        )
        app.processingData(currentQues)
    },

    render: function (currentQues, quesContent, ans1, ans2, ans3, ans4, corr) {
        var empty = document.querySelector('.render-container h2');
        empty.innerHTML = `
        <ul class="render-question">'câu hỏi số' ${currentQues + 1}
            <li class="">${quesContent}</li>
            <li class=""><span>${ans1}</span><input name="render-answer ${currentQues + 1}" type="radio" value="${ans1}" class="render-answer"></li><br>
            <li class=""><span>${ans2}</span><input name="render-answer ${currentQues + 1}" type="radio" value="${ans2}" class="render-answer"></li><br>
            <li class=""><span>${ans3}</span><input name="render-answer ${currentQues + 1}" type="radio" value="${ans3}" class="render-answer"></li><br>
            <li class=""><span>${ans4}</span><input name="render-answer ${currentQues + 1}" type="radio" value="${ans4}" class="render-answer"></li><br>
        </ul>
        `    
    },

    handle: function () {
                 
        nextBtn.onclick = () => {
            
            
            app.oneQues(currentQues)
            console.log(currentQues)
            app.processingData(currentQues)
            
            // mỗi lần nhấn nút next thì gọi hàm oneQues (1 câu hỏi ở bên dưới) , mỗi lần nhấn là mỗi lần chạy vòng lặp
            // hàm bên dưới chạy vòng lặp tăng dần và trả về câu hỏi hiện tại (currentQues)
            
            if (currentQues === 0) {
                document.querySelector('.next-question').innerHTML = `Next question`
            }

            if (currentQues === 9) {
                document.querySelector('.next-question').innerHTML = `Submit`

                nextBtn.onclick = () => {
                    
                    alert('Đã nộp bài' , score)

                    app.firstRender()
                    document.querySelector('.next-question').innerHTML = `Next question`

                    currentQues = 0;
                    app.handle()

                    app.getPoint(time)          // hàm chấm điểm
                    score = 0
                    ++time
                }
            }
            currentQues = ++currentQues
        }       
        

    },


    oneQues: function (currentQues) {

        
        questions.forEach((question, index) => { 
                   /// vòng lặp trả về các object {} (từng câu hỏi nhỏ)
            
            if (index === currentQues) {
                const oneQues = {}

                oneQues.quesContent = question.questionContent
                oneQues.ans1 = question.answer1
                oneQues.ans2 = question.answer2
                oneQues.ans3 = question.answer3
                oneQues.ans4 = question.answer4
                oneQues.corr = question.correct

                app.render(currentQues,oneQues.quesContent,oneQues.ans1,
                oneQues.ans2,oneQues.ans3,oneQues.ans4,oneQues.corr)
                  
            }
 
            
        })
        
    },

    processingData: function (index) {
        
        var check = document.querySelectorAll('input')
        
        check.forEach((item) => {
            item.onclick = () => {
                
                if(item.checked) {
                    var currentValue = item.value
                    userAnswer[index] = currentValue
                    
                } 
            }  
        })    
    },


    getPoint: function (time) {
        for (i = 0; i < 10; ++i) {
            if (userAnswer[i] === questions[i].correct) {
                ++score
            }    
        }
        
        var pushScore = []
        pushScore[0] = score
        localStorage.setItem(`time ${time}`, score)
        console.log(pushScore)
    },


    start: function () {
        this.handle()
        // this.firstRender()
        this.processingData()
    }
}

app.start()
// console.log(questions)


// muốn nhấn nút để đổi câu hỏi thì :
//  if else nằm trong vòng lặp, và vòng lặp đó nằm trong onclick
// onclick --> vòng lặp -- > if else



// lặp qua các radio , mỗi khi nhấn vào radio thì lấy value của radio đó push vào mảng trống,
// xong mang xo sánh với mảng đáp án lấy từ localStorage