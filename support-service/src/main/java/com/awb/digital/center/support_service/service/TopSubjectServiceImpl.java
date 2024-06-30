package com.awb.digital.center.support_service.service;

import com.awb.digital.center.support_service.dto.TopSubjectDto;
import com.awb.digital.center.support_service.entity.TopSubject;
import com.awb.digital.center.support_service.exception.ResourceNotFoundException;
import com.awb.digital.center.support_service.repository.TopSubjectRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TopSubjectServiceImpl implements TopSubjectService{

    private TopSubjectRepository topSubjectRepository;

    private ModelMapper modelMapper;

    @Override
    public TopSubjectDto createTopSubject(TopSubjectDto topSubjectDto) {
        TopSubject subject = modelMapper.map(topSubjectDto, TopSubject.class);
        TopSubject savedSubject = topSubjectRepository.save(subject) ;

        TopSubjectDto savedSubjectDto = modelMapper.map(savedSubject, TopSubjectDto.class);

        return savedSubjectDto;
    }

    @Override
    public List<TopSubjectDto> getAllTopSubject() {
        List<TopSubject> subjects = topSubjectRepository.findAll();

        return  subjects.stream()
                .map((subject)-> modelMapper.map(subject, TopSubjectDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TopSubjectDto updateTopSubject(Long id, TopSubjectDto topSubjectDto) {
        TopSubject subject = topSubjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id:" +id));

        subject.setName(topSubjectDto.getName());

        TopSubject updatedSubject = topSubjectRepository.save(subject);

        return modelMapper.map(updatedSubject, TopSubjectDto.class);
    }

    @Override
    public void deleteTopSubject(Long id) {
        TopSubject subject = topSubjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id:" +id));

        topSubjectRepository.delete(subject);
    }
}
