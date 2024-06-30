package com.gdsd.TutorService.dto.Forums;

import java.util.List;

public class AnswerResponseDto {
    private Question question;
    private List<Answer> answers;

    public static class Question {
        private Integer id;
        private String title;
        private String description;
        private String questionBy;
        private String timestamp;

        public Question() {
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getQuestionBy() {
            return questionBy;
        }

        public void setQuestionBy(String questionBy) {
            this.questionBy = questionBy;
        }

        public String getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(String timestamp) {
            this.timestamp = timestamp;
        }
    }

    public static class Answer {
        private Integer id;
        private String description;
        private String answerBy;
        private String timestamp;

        public Answer() {
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getAnswerBy() {
            return answerBy;
        }

        public void setAnswerBy(String answerBy) {
            this.answerBy = answerBy;
        }

        public String getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(String timestamp) {
            this.timestamp = timestamp;
        }
    }

    public AnswerResponseDto() {
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }
}
