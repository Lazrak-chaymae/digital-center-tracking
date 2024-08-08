package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.CustomPhaseDto;
import com.awb.digital.center.project_service.entity.CustomPhase;
import com.awb.digital.center.project_service.repository.CustomPhaseRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CustomPhaseServiceImpl implements CustomPhaseService{

     private CustomPhaseRepository repository;
     private ModelMapper mapper;


    @Override
    public List<CustomPhaseDto> getAllPhases() {
        List<CustomPhase> phases = repository.findAll();
        return phases.stream()
                .map((phase) -> mapper.map(phase, CustomPhaseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public CustomPhaseDto addPhase(CustomPhaseDto phaseDto) {
      CustomPhase  phase = mapper.map(phaseDto, CustomPhase.class);
      CustomPhase savedPhase =  repository.save(phase);
         return mapper.map(savedPhase, CustomPhaseDto.class);
    }
}
