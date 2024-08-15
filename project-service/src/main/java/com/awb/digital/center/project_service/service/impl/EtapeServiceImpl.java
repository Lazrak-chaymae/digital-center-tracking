package com.awb.digital.center.project_service.service.impl;

import com.awb.digital.center.project_service.dto.EtapeDto;
import com.awb.digital.center.project_service.entity.Etape;
import com.awb.digital.center.project_service.exception.ResourceNotFoundException;
import com.awb.digital.center.project_service.repository.EtapeRepository;
import com.awb.digital.center.project_service.service.EtapeService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EtapeServiceImpl implements EtapeService {

    private EtapeRepository etapeRepository;
    private ModelMapper mapper;

    @Override
    public List<EtapeDto> getAllEtapes(Integer domainId) {
       List<Etape> etapeList = etapeRepository.findAllByDomainId(domainId);
        return etapeList.stream()
                .map((etape -> mapper.map(etape, EtapeDto.class)))
                .collect(Collectors.toList());
    }

    @Override
    public EtapeDto addEtape(EtapeDto etapeDto) {
        Etape etape = mapper.map(etapeDto, Etape.class);
        Etape createdEtape = etapeRepository.save(etape);
        return mapper.map(createdEtape, EtapeDto.class);
    }

    @Override
    public EtapeDto updateEtape(EtapeDto etapeDto, Long id) {
        Etape etape = etapeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Etape doesn't exists with id : " + id));

        etape.setName(etapeDto.getName());
        Etape updatedEtape = etapeRepository.save(etape);
        return mapper.map(updatedEtape, EtapeDto.class);
    }

    @Override
    public void deleteEtape(Long id) {
        Etape etape = etapeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Etape doesn't exists with id : " + id));

        etapeRepository.delete(etape);
    }
}
