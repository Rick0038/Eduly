package com.gdsd.TutorService.dto.Admin;

import java.time.LocalDateTime;
import java.util.List;
public class StudentContentDTO {

    public static class StudentProfileContentDTO {

        private Integer id;
        private Integer studentId;
        private String type;
        private String link;

        private String studentName;
        private String status;
        private LocalDateTime uploadTimestamp;
        public StudentProfileContentDTO() {
        }
        public StudentProfileContentDTO(Integer contentId, Integer studentId, String contentType, String contentLink, String studentNameFromId, String status, LocalDateTime uploadTimestamp) {
            this.id = id;
            this.studentId = studentId;
            this.type = type;
            this.link = link;
            this.status = status;
            this.studentName = studentName;
            this.uploadTimestamp = uploadTimestamp;
        }



        public Integer getid() {
            return id;
        }

        public void setid(Integer id) {
            this.id = id;
        }

        public Integer getStudentId() {
            return studentId;
        }

        public void setStudentId(Integer studentId) {
            this.studentId = studentId;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getLink() {
            return link;
        }

        public void setLink(String link) {
            this.link = link;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getStudentName() {
            return studentName;
        }

        public void setStudentName(String studentName) {
            this.studentName = studentName;
        }

        public LocalDateTime getUploadTimestamp() {
            return uploadTimestamp;
        }

        public void setUploadTimestamp(LocalDateTime uploadTimestamp) {
            this.uploadTimestamp = uploadTimestamp;
        }
    }

    public static class ContentResponseDTO {
        private List<StudentProfileContentDTO> content;

        // Getters and Setters
        public List<StudentProfileContentDTO> getContent() {
            return content;
        }

        public void setContent(List<StudentProfileContentDTO> content) {
            this.content = content;
        }
    }
}