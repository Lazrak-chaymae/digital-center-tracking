package com.awb.digital.center.support_service.service;

import com.awb.digital.center.support_service.dto.SupportDto;
import com.awb.digital.center.support_service.entity.Support;
import com.awb.digital.center.support_service.exception.ResourceNotFoundException;
import com.awb.digital.center.support_service.repository.SupportRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SupportServiceImpl implements SupportService {

    private SupportRepository supportRepository;

    private ModelMapper modelMapper;

    @Override
    public SupportDto createSupport(SupportDto supportDto) {
        Support support = modelMapper.map(supportDto, Support.class);
        Support savedSupport = supportRepository.save(support) ;
        SupportDto savedSupportDto = modelMapper.map(savedSupport, SupportDto.class);
        return savedSupportDto;
    }

    @Override
    public List<SupportDto> getAllSupport() {
        List<Support> supports = supportRepository.findAll();

        return  supports.stream()
                .map((support)-> modelMapper.map(support, SupportDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public SupportDto updateSupport(Long id, SupportDto supportDto) {
        Support support = supportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Support not found with id:" +id));

        support.setTicketCount(supportDto.getTicketCount());
        support.setEffortSpent(supportDto.getEffortSpent());

        Support updatedSupport = supportRepository.save(support);

        return modelMapper.map(updatedSupport, SupportDto.class);

    }

    @Override
    public void deleteSupport(Long id) {
        Support support = supportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Support not found with id:" +id));

        supportRepository.delete(support);

    }
}
