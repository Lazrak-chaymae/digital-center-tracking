package com.awb.digital.center.dashboard_service.service.impl;

import com.awb.digital.center.dashboard_service.dto.TechnicalDebtDto;
import com.awb.digital.center.dashboard_service.entity.TechnicalDebt;
import com.awb.digital.center.dashboard_service.exception.ResourceNotFoundException;
import com.awb.digital.center.dashboard_service.repository.TechnicalDebtRepository;
import com.awb.digital.center.dashboard_service.service.TechnicalDebtService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TechnicalDebtServiceImpl implements TechnicalDebtService {

    private TechnicalDebtRepository repository;

    private ModelMapper modelMapper;

    @Override
    public TechnicalDebtDto createDebt(TechnicalDebtDto technicalDebtDto) {
        TechnicalDebt debt = modelMapper.map(technicalDebtDto, TechnicalDebt.class);
        TechnicalDebt savedDebt = repository.save(debt);
        return modelMapper.map(savedDebt, TechnicalDebtDto.class);

    }

    @Override
    public List<TechnicalDebtDto> getAllDebt() {
        List<TechnicalDebt> debts = repository.findAll();

        return debts.stream()
                .map((debt) -> modelMapper.map(debt, TechnicalDebtDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public TechnicalDebtDto updateDebt(Long id, TechnicalDebtDto technicalDebtDto) {
        TechnicalDebt debt = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Debt not found with id:" +id));
        debt.setTitle(technicalDebtDto.getTitle());
        debt.setType(technicalDebtDto.getType());
        debt.setImpact(technicalDebtDto.getImpact());
        debt.setCost(technicalDebtDto.getCost());
        debt.setVoluntary(technicalDebtDto.getVoluntary());
        debt.setComment(technicalDebtDto.getComment());

        TechnicalDebt savedDebt = repository.save(debt);

        return modelMapper.map(savedDebt, TechnicalDebtDto.class);

    }

    @Override
    public void deleteDebt(Long id) {
        TechnicalDebt debt = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Debt not found with id:" +id));

        repository.delete(debt);

    }
}
