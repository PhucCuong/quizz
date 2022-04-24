var addBtn = document.querySelector('.add')
var renderOneQuestion = document.querySelector('.render-container')
var nextQuestionBtn = document.querySelector('.next-question')
var quantity = 0 // số lượng câu hỏi trên localStorage


const app = {

    // questionsArray:  JSON.parse(localStorage.getItem('data')) || [],   // không được đặt biến này ở đây
    
    oneQuestion:  {}, // chứa nội dung chung của 1 câu hỏi

  
    handle: function() {
        
        addBtn.onclick = () => {
            
            
            var questionsArray =  JSON.parse(localStorage.getItem('data')) || []  // PHẢI đặt biến 
            //này ở đây vì mỗi lần onclick phải lấy dữ liệu từ localStorage về 1 lần, 
            //chứ để ngoài kia thì chỉ lấy có 1 lần nên value sau sẽ đè value trước


            if (quantity <= 9) {


                var ques = document.querySelector('.question').value
                var answer1 = document.querySelectorAll('.answer')[0].value
                var answer2 = document.querySelectorAll('.answer')[1].value
                var answer3 = document.querySelectorAll('.answer')[2].value
                var answer4 = document.querySelectorAll('.answer')[3].value
                var correct = document.querySelector('.correct-answer').value
    
               
                app.oneQuestion.questionContent = ques
                app.oneQuestion.answer1 = answer1
                app.oneQuestion.answer2 = answer2
                app.oneQuestion.answer3 = answer3
                app.oneQuestion.answer4 = answer4
                app.oneQuestion.correct = correct
    
                questionsArray.push(app.oneQuestion)
                localStorage.setItem('data', JSON.stringify(questionsArray))

                quantity = ++quantity

                alert('thêm câu hỏi thành công') 

            } else {
                alert('đã đủ 10 câu hỏi, các câu sau không tính nữa') 
            }

        }

    },

    start: function () {
        this.handle()
    }
}

app.start()



localStorage.setItem('data', null)