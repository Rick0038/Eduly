package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Forums.AnswerRequestDto;
import com.gdsd.TutorService.dto.Forums.AnswerResponseDto;
import com.gdsd.TutorService.dto.Forums.QuestionRequestDto;
import com.gdsd.TutorService.dto.Forums.QuestionResponseDto;

public interface ForumService {
    void askQuestion(Integer askerId, String askerRole, QuestionRequestDto questionRequestDto);
    void answerQuestion(Integer answererId, String answererRole, Integer questionId, AnswerRequestDto answerRequestDto);
    QuestionResponseDto getQuestionWithKeyword(String keyword);
    QuestionResponseDto getAllQuestions();
    AnswerResponseDto getAnswersForQuestion(Integer questionId);
}
