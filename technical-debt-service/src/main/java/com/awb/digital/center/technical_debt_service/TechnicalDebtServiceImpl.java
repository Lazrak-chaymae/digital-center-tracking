package com.awb.digital.center.technical_debt_service;

import com.awb.digital.center.technical_debt_service.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TechnicalDebtServiceImpl implements TechnicalDebtService{

    private TechnicalDebtRepository technicalDebtRepository;

    private ModelMapper modelMapper;

    @Override
    public TechnicalDebtDto createDebt(TechnicalDebtDto technicalDebtDto) {
        TechnicalDebtEntity dept = modelMapper.map(technicalDebtDto, TechnicalDebtEntity.class);
        TechnicalDebtEntity savedDept = technicalDebtRepository.save(dept);
        return modelMapper.map(savedDept, TechnicalDebtDto.class);
    }

    @Override
    public List<TechnicalDebtDto> getAllDebt() {
        List<TechnicalDebtEntity> debts = technicalDebtRepository.findAll();

        return debts.stream()
                .map((debt) -> modelMapper.map(debt, TechnicalDebtDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TechnicalDebtDto updateDebt(Long id, TechnicalDebtDto technicalDebtDto) {
        TechnicalDebtEntity dept = technicalDebtRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dept not found with id:" +id));
        dept.setTitle(technicalDebtDto.getTitle());
        dept.setType(technicalDebtDto.getType());
        dept.setImpact(technicalDebtDto.getImpact());
        dept.setCost(technicalDebtDto.getCost());
        dept.setVoluntary(technicalDebtDto.getVoluntary());
        dept.setComment(technicalDebtDto.getComment());

        TechnicalDebtEntity savedDept = technicalDebtRepository.save(dept);

        return modelMapper.map(savedDept, TechnicalDebtDto.class);
    }

    @Override
    public void deleteDebt(Long id) {
        TechnicalDebtEntity dept = technicalDebtRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dept not found with id:" +id));

        technicalDebtRepository.delete(dept);
    }
}
