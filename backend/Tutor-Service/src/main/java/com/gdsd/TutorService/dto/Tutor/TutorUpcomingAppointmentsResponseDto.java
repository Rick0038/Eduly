package com.gdsd.TutorService.dto.Tutor;

import java.util.List;

public class TutorUpcomingAppointmentsResponseDto {
    private String bbbLink;
    private List<Appointment> appointments;

    public static class Appointment {
        private String date;
        private List<Timing> timings;

        public static class Timing {
            private Integer sessionId;
            private String from;
            private String to;
            private String status;
            private With with;
            private String type;

            public static class With {
                private Integer id;
                private String firstName;
                private String lastName;
                private String profileImgLink;

                public With() {
                }

                public Integer getId() {
                    return id;
                }

                public void setId(Integer id) {
                    this.id = id;
                }

                public String getFirstName() {
                    return firstName;
                }

                public void setFirstName(String firstName) {
                    this.firstName = firstName;
                }

                public String getLastName() {
                    return lastName;
                }

                public void setLastName(String lastName) {
                    this.lastName = lastName;
                }

                public String getProfileImgLink() {
                    return profileImgLink;
                }

                public void setProfileImgLink(String profileImgLink) {
                    this.profileImgLink = profileImgLink;
                }
            }

            public Timing() {
            }

            public Integer getSessionId() {
                return sessionId;
            }

            public void setSessionId(Integer sessionId) {
                this.sessionId = sessionId;
            }

            public String getFrom() {
                return from;
            }

            public void setFrom(String from) {
                this.from = from;
            }

            public String getTo() {
                return to;
            }

            public void setTo(String to) {
                this.to = to;
            }

            public String getStatus() {
                return status;
            }

            public void setStatus(String status) {
                this.status = status;
            }

            public With getWith() {
                return with;
            }

            public void setWith(With with) {
                this.with = with;
            }

            public String getType() {
                return type;
            }

            public void setType(String type) {
                this.type = type;
            }
        }

        public Appointment() {
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public List<Timing> getTimings() {
            return timings;
        }

        public void setTimings(List<Timing> timings) {
            this.timings = timings;
        }
    }

    public TutorUpcomingAppointmentsResponseDto() {
    }

    public String getBbbLink() {
        return bbbLink;
    }

    public void setBbbLink(String bbbLink) {
        this.bbbLink = bbbLink;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
