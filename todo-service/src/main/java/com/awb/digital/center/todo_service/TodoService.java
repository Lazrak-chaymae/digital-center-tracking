package com.awb.digital.center.todo_service;

import java.util.List;

public interface TodoService {

     List<TodoDto> getTodosByDomain(Integer domainId);
     List<TodoDto> getTodosByProject(Integer projectId);
     TodoDto addTodo(TodoDto todoDto);
     TodoDto updateTodo(Long id, TodoDto todoDto);
     void deleteTodo(Long id);
     void updateTodoName(Long todoId,String name);
     void updateTodoDetail(Long todoId, String detail);
     void updateTodoDeadline(Long todoId, String deadline);
     void updateTodoStatus(Long todoId, String status);
     void updateTodoUser(Long todoId, Integer userId);



}
