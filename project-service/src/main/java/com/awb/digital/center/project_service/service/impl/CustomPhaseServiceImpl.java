package com.awb.digital.center.project_service.service.impl;

import com.awb.digital.center.project_service.dto.CustomPhaseDto;
import com.awb.digital.center.project_service.entity.CustomPhase;
import com.awb.digital.center.project_service.repository.CustomPhaseRepository;
import com.awb.digital.center.project_service.service.CustomPhaseService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CustomPhaseServiceImpl implements CustomPhaseService {

     private CustomPhaseRepository repository;
     private ModelMapper mapper;


    @Override
    public List<CustomPhaseDto> getAllPhases(Integer domainId) {
        List<CustomPhase> phases = repository.findAllByDomainId(domainId);
        return phases.stream()
                .map((phase) -> mapper.map(phase, CustomPhaseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public CustomPhaseDto addPhase(CustomPhaseDto phaseDto) {
//        if (repository.existsByName(phaseDto.getName())) {
//            throw new IllegalArgumentException("Phase with name " + phaseDto.getName() + " already exists.");
//        }
        if (repository.existsByNameAndDomainId(phaseDto.getName(), phaseDto.getDomainId())) {
            throw new IllegalArgumentException("Phase with name " + phaseDto.getName() + "in this domain" + phaseDto.getDomainId() + "  already exists.");
        }
      CustomPhase  phase = mapper.map(phaseDto, CustomPhase.class);

      CustomPhase savedPhase =  repository.save(phase);
         return mapper.map(savedPhase, CustomPhaseDto.class);
    }
}
