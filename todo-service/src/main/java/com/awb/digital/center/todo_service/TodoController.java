package com.awb.digital.center.todo_service;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("/api/todos")
@RestController
public class TodoController {

    private TodoService todoService;

    @GetMapping("/domain/{domainId}")
    public ResponseEntity<List<TodoDto>> getAllTodosByDomain(@PathVariable Integer domainId){
         List<TodoDto> todos = todoService.getTodosByDomain(domainId);
         return ResponseEntity.ok(todos);
    }
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TodoDto>> getAllTodosByProject(@PathVariable Integer projectId){
        List<TodoDto> todos = todoService.getTodosByProject(projectId);
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<TodoDto> createTodo(@RequestBody TodoDto todoDto){
        TodoDto todo = todoService.addTodo(todoDto);
        return new ResponseEntity<>(todo, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id,@RequestBody TodoDto todoDto){
        TodoDto todo = todoService.updateTodo(id, todoDto);
        return ResponseEntity.ok(todo);
    }
    @PatchMapping("{todoId}/name")
    public ResponseEntity<String>  updateTodoName(@PathVariable Long todoId,@RequestBody String name){
        todoService.updateTodoName(todoId, name);
        return ResponseEntity.ok("Todo name updated successfully!.");
    }
    @PatchMapping("{todoId}/detail")
    public ResponseEntity<String>  updateTodoDetail(@PathVariable Long todoId,@RequestBody String detail){
        todoService.updateTodoDetail(todoId, detail);
        return ResponseEntity.ok("Todo Detail updated successfully!.");
    }
    @PatchMapping("{todoId}/deadline")
    public ResponseEntity<String>  updateTodoDeadline(@PathVariable Long todoId,@RequestBody String deadline){
        todoService.updateTodoDeadline(todoId, deadline);
        return ResponseEntity.ok("Todo deadline updated successfully!.");
    }
    @PatchMapping("{todoId}/status")
    public ResponseEntity<String>  updateTodoStatus(@PathVariable Long todoId,@RequestBody String status){
        todoService.updateTodoStatus(todoId, status);
        return ResponseEntity.ok("Todo status updated successfully!.");
    }
    @PatchMapping("{todoId}/user")
    public ResponseEntity<String>  updateTodoUserName(@PathVariable Long todoId, @RequestBody String userName){
        todoService.updateTodoUser(todoId, userName);
        return ResponseEntity.ok("Todo porter updated successfully!.");
    }
    @PatchMapping("{todoId}/responsible")
    public ResponseEntity<String>  updateTodoResponsible(@PathVariable Long todoId, @RequestBody String responsible){
        todoService.updateTodoResponsible(todoId, responsible);
        return ResponseEntity.ok("Todo user responsible updated successfully!.");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
        return ResponseEntity.ok("Task deleted successfully!.");
    }
}
