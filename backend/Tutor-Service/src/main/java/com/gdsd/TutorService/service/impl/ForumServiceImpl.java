package com.gdsd.TutorService.service.impl;

import com.gdsd.TutorService.dto.Forums.AnswerRequestDto;
import com.gdsd.TutorService.dto.Forums.AnswerResponseDto;
import com.gdsd.TutorService.dto.Forums.QuestionRequestDto;
import com.gdsd.TutorService.dto.Forums.QuestionResponseDto;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.model.Answer;
import com.gdsd.TutorService.model.Question;
import com.gdsd.TutorService.repository.AnswerRepository;
import com.gdsd.TutorService.repository.QuestionRepository;
import com.gdsd.TutorService.service.interf.ForumService;
import com.gdsd.TutorService.service.interf.StudentService;
import com.gdsd.TutorService.service.interf.TutorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ForumServiceImpl implements ForumService {

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private TutorService tutorService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void askQuestion(Integer askerId, String askerRole, QuestionRequestDto questionRequestDto) {
        Question question = new Question();
        question.setId(null);
        question.setTitle(questionRequestDto.getTitle());
        question.setDescription(questionRequestDto.getDescription());
        question.setAskerId(askerId);
        question.setAskerRole(askerRole);
        question.setTimestamp(LocalDateTime.now());

        questionRepository.save(question);
    }

    @Override
    public void answerQuestion(Integer answererId, String answererRole, Integer questionId, AnswerRequestDto answerRequestDto) {
        Answer answer = new Answer();
        answer.setId(null);
        answer.setDescription(answerRequestDto.getDescription());
        answer.setAnswererId(answererId);
        answer.setAnswererRole(answererRole);
        answer.setTimestamp(LocalDateTime.now());
        answer.setQuestionId(questionId);

        answerRepository.save(answer);
    }

    @Override
    public QuestionResponseDto getQuestionWithKeyword(String keyword) {
        List<Question> questions = questionRepository.
                findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrderByTimestampDesc(keyword, keyword);

        QuestionResponseDto questionResponseDto = new QuestionResponseDto();
        List<QuestionResponseDto.Question> questionDtos = questions.stream().map(question -> {
            QuestionResponseDto.Question questionDto = new QuestionResponseDto.Question();
            questionDto.setId(question.getId());
            questionDto.setTitle(question.getTitle());
            questionDto.setDescription(question.getDescription());

            if (question.getAskerRole().equals("TUTOR")) {
                questionDto.setQuestionBy(tutorService.getTutorNameFromId(question.getAskerId()));
            } else {
                questionDto.setQuestionBy(studentService.getStudentNameFromId(question.getAskerId()));
            }

            questionDto.setTimestamp(question.getTimestamp().toString());
            return questionDto;
        }).collect(Collectors.toList());
        questionResponseDto.setQuestions(questionDtos);
        return questionResponseDto;
    }

    @Override
    public QuestionResponseDto getAllQuestions() {
        List<Question> questions = questionRepository.findAllByOrderByTimestampDesc();

        QuestionResponseDto questionResponseDto = new QuestionResponseDto();
        List<QuestionResponseDto.Question> questionDtos = questions.stream().map(question -> {
            QuestionResponseDto.Question questionDto = new QuestionResponseDto.Question();
            questionDto.setId(question.getId());
            questionDto.setTitle(question.getTitle());
            questionDto.setDescription(question.getDescription());

            if (question.getAskerRole().equals("TUTOR")) {
                questionDto.setQuestionBy(tutorService.getTutorNameFromId(question.getAskerId()));
            } else {
                questionDto.setQuestionBy(studentService.getStudentNameFromId(question.getAskerId()));
            }

            questionDto.setTimestamp(question.getTimestamp().toString());
            return questionDto;
        }).collect(Collectors.toList());
        questionResponseDto.setQuestions(questionDtos);
        return questionResponseDto;
    }

    @Override
    public AnswerResponseDto getAnswersForQuestion(Integer questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new GenericException("Question not found", HttpStatus.NOT_FOUND));

        List<Answer> answers = answerRepository.findByQuestionIdOrderByTimestampDesc(question.getId());

        AnswerResponseDto answerResponseDto = new AnswerResponseDto();

        AnswerResponseDto.Question questionDto = new AnswerResponseDto.Question();
        questionDto.setId(question.getId());
        questionDto.setTitle(question.getTitle());
        questionDto.setDescription(question.getDescription());
        questionDto.setTimestamp(question.getTimestamp().toString());
        if (question.getAskerRole().equals("TUTOR")) {
            questionDto.setQuestionBy(tutorService.getTutorNameFromId(question.getAskerId()));
        } else {
            questionDto.setQuestionBy(studentService.getStudentNameFromId(question.getAskerId()));
        }
        answerResponseDto.setQuestion(questionDto);

        List<AnswerResponseDto.Answer> answerDtos = answers.stream().map(answer -> {
            AnswerResponseDto.Answer answerDto = new AnswerResponseDto.Answer();
            answerDto.setId(answer.getId());
            answerDto.setDescription(answer.getDescription());
            answerDto.setTimestamp(answer.getTimestamp().toString());
            if (answer.getAnswererRole().equals("TUTOR")) {
                answerDto.setAnswerBy(tutorService.getTutorNameFromId(answer.getAnswererId()));
            } else {
                answerDto.setAnswerBy(studentService.getStudentNameFromId(answer.getAnswererId()));
            }

            return answerDto;
        }).collect(Collectors.toList());
        answerResponseDto.setAnswers(answerDtos);

        return answerResponseDto;
    }
}
