package com.gdsd.TutorService.controller.Forums;

import com.gdsd.TutorService.dto.Forums.AnswerResponseDto;
import com.gdsd.TutorService.dto.Forums.QuestionResponseDto;
import com.gdsd.TutorService.service.interf.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forums")
public class ForumsUnsecuredController {

    @Autowired
    private ForumService forumService;

    @GetMapping("/questions")
    public ResponseEntity<QuestionResponseDto> getAllQuestions(@RequestParam(required = false) String keyword) {

        QuestionResponseDto questionResponseDto = (keyword != null && !keyword.isEmpty()) ?
                forumService.getQuestionWithKeyword(keyword) : forumService.getAllQuestions();

        return new ResponseEntity<>(questionResponseDto, HttpStatus.OK);
    }

    @GetMapping("/answer/{questionId}")
    public ResponseEntity<AnswerResponseDto> getAnswersForQuestion(@PathVariable Integer questionId) {

        AnswerResponseDto answerResponseDto = forumService.getAnswersForQuestion(questionId);

        return new ResponseEntity<>(answerResponseDto, HttpStatus.OK);
    }
}
