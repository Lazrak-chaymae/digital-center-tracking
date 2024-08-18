package com.awb.digital.center.dashboard_service.service.impl;

import com.awb.digital.center.dashboard_service.dto.SupportDto;
import com.awb.digital.center.dashboard_service.entity.Support;
import com.awb.digital.center.dashboard_service.exception.ResourceNotFoundException;
import com.awb.digital.center.dashboard_service.repository.SupportRepository;
import com.awb.digital.center.dashboard_service.service.SupportService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SupportServiceImpl implements SupportService {

    private SupportRepository repository;

    private ModelMapper modelMapper;


    @Override
    public SupportDto createSupport(SupportDto supportDto) {
        Support support = modelMapper.map(supportDto, Support.class);
        Support savedSupport = repository.save(support) ;
        SupportDto savedSupportDto = modelMapper.map(savedSupport, SupportDto.class);
        return savedSupportDto;
    }

    @Override
    public SupportDto getSupport(Integer domainId) {
        Support support = repository.findByDomainId(domainId);
        return modelMapper.map(support, SupportDto.class);
    }

    @Override
    public SupportDto updateSupport(Long id, SupportDto supportDto) {
        Support support = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Support not found with id:" +id));

        support.setTicketCount(supportDto.getTicketCount());
        support.setEffortSpent(supportDto.getEffortSpent());

        Support updatedSupport = repository.save(support);

        return modelMapper.map(updatedSupport, SupportDto.class);

    }

    @Override
    public void deleteSupport(Long id) {
        Support support = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Support not found with id:" +id));

        repository.delete(support);
    }

    @Override
    public void updateTicketCount(Long id, Integer ticketCount) {
         Support support = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Support not found with id:" +id));
         support .setTicketCount(ticketCount);
         repository.save(support);
    }

    @Override
    public void updateEffortSpent(Long id, String effortSpent) {
        Support support = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Support not found with id:" + id));
        support.setEffortSpent(effortSpent);
        repository.save(support);
    }

    @Override
    public void updateTopSubjects(Long id, Integer index, String subject) {
        Support support = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Support not found with id:" + id));
        support.getTopSubjects().set(index, subject);
        repository.save(support);

    }
}
