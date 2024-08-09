package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.SquadDto;
import com.awb.digital.center.project_service.entity.Squad;
import com.awb.digital.center.project_service.repository.SquadRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SquadServiceImpl implements SquadService{

    private SquadRepository repository;
    private ModelMapper mapper;

    @Override
    public List<SquadDto> GetAllSquads(Integer domainId) {
       List<Squad> squads = repository.findAllByDomainId(domainId);
        return squads.stream()
                .map((squad -> mapper.map(squad,SquadDto.class)))
                .collect(Collectors.toList());
    }

    @Override
    public SquadDto createSquad(SquadDto squadDto) {
        Squad squad = mapper.map(squadDto, Squad.class);
        Squad createdSquad = repository.save(squad);
        return mapper.map(createdSquad, SquadDto.class);
    }
}
