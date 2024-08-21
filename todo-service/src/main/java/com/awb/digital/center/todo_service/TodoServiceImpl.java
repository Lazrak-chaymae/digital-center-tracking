package com.awb.digital.center.todo_service;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TodoServiceImpl implements TodoService{

     private TodoRepository todoRepository;
     private ModelMapper mapper;

    @Override
    public List<TodoDto> getTodosByDomain(Integer domainId) {
        List<TodoEntity> todos =  todoRepository.findByDomainId(domainId);
        return todos.stream()
                .map((todo -> mapper.map(todo, TodoDto.class)))
                .collect(Collectors.toList());
    }

    @Override
    public List<TodoDto> getTodosByProject(Integer projectId) {
        List<TodoEntity> todos = todoRepository.findByProjectId(projectId);
        return todos.stream()
                .map((todo -> mapper.map(todo, TodoDto.class)))
                .collect(Collectors.toList());
    }

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
         TodoEntity todo = mapper.map(todoDto, TodoEntity.class);
         TodoEntity createdTodo = todoRepository.save(todo);
        return mapper.map(createdTodo, TodoDto.class);
    }

    @Override
    public TodoDto updateTodo(Long id, TodoDto todoDto) {
        TodoEntity todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + id));
        todo.setName(todoDto.getName());
        todo.setDetail(todoDto.getDetail());
        todo.setDeadline(todoDto.getDeadline());
        todo.setStatus(todoDto.getStatus());
        todo.setUserId(todoDto.getUserId());
        todoRepository.save(todo);
        return mapper.map(todo, TodoDto.class);
    }

    @Override
    public void deleteTodo(Long id) {
        TodoEntity todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + id));
        todoRepository.delete(todo);
    }

    @Override
    public void updateTodoName(Long todoId, String name) {
        TodoEntity todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + todoId));
        todo.setName(name);
        todoRepository.save(todo);
    }

    @Override
    public void updateTodoDetail(Long todoId, String detail) {
        TodoEntity todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + todoId));
        todo.setDetail(detail);
        todoRepository.save(todo);
    }

    @Override
    public void updateTodoDeadline(Long todoId, String deadline) {
        TodoEntity todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + todoId));
        LocalDate date = LocalDate.parse(deadline);
        todo.setDeadline(date);
        todoRepository.save(todo);
    }

    @Override
    public void updateTodoStatus(Long todoId, String status) {
        TodoEntity todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + todoId));
        todo.setStatus(status);
        todoRepository.save(todo);
    }

    @Override
    public void updateTodoUser(Long todoId, Integer userId) {
        TodoEntity todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + todoId));
        todo.setUserId(userId);
        todoRepository.save(todo);
    }
}
