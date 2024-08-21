package com.awb.digital.center.todo_service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/todos")
@RestController
public class TodoController {

    private TodoService todoService;

    @GetMapping("/domain/{id}")
    public ResponseEntity<List<TodoDto>> getAllTodosByDomain(Integer domainId){
         List<TodoDto> todos = todoService.getTodosByDomain(domainId);
         return ResponseEntity.ok(todos);
    }
    @GetMapping("/project/{id}")
    public ResponseEntity<List<TodoDto>> getAllTodosByProject(Integer projectId){
        List<TodoDto> todos = todoService.getTodosByProject(projectId);
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<TodoDto> createTodo(TodoDto todoDto){
        TodoDto todo = todoService.addTodo(todoDto);
        return new ResponseEntity<>(todo, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id,@RequestBody TodoDto todoDto){
        TodoDto todo = todoService.updateTodo(id, todoDto);
        return ResponseEntity.ok(todo);
    }
    @PatchMapping("{id}/name")
    public ResponseEntity<String>  updateTodoName(@PathVariable Long todoId,@RequestBody String name){
        todoService.updateTodoName(todoId, name);
        return ResponseEntity.ok("Todo name updated successfully!.");
    }
    @PatchMapping("{id}/detail")
    public ResponseEntity<String>  updateTodoDetail(@PathVariable Long todoId,@RequestBody String detail){
        todoService.updateTodoDetail(todoId, detail);
        return ResponseEntity.ok("Todo Detail updated successfully!.");
    }
    @PatchMapping("{id}/deadline")
    public ResponseEntity<String>  updateTodoDeadline(@PathVariable Long todoId,@RequestBody String deadline){
        todoService.updateTodoDeadline(todoId, deadline);
        return ResponseEntity.ok("Todo deadline updated successfully!.");
    }
    @PatchMapping("{id}/status")
    public ResponseEntity<String>  updateTodoStatus(@PathVariable Long todoId,@RequestBody String status){
        todoService.updateTodoStatus(todoId, status);
        return ResponseEntity.ok("Todo status updated successfully!.");
    }
    @PatchMapping("{id}/user")
    public ResponseEntity<String>  updateTodoUserId(@PathVariable Long todoId,@RequestBody Integer userId){
        todoService.updateTodoUser(todoId, userId);
        return ResponseEntity.ok("Todo user id updated successfully!.");
    }
}
