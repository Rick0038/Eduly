package com.gdsd.TutorService.dto.Forums;

import java.util.List;

public class QuestionResponseDto {
    private List<Question> questions;

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

    public QuestionResponseDto() {
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
