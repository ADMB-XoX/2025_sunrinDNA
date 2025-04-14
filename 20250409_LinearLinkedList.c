#include <stdio.h>
#include <stdlib.h>

typedef struct Node{
  int data;
  struct Node* next;
}Node;

struct Node* head;

void push(int data){
  Node* temp = malloc(sizeof(Node));
  Node* current = head;
  if(head == NULL){
    head = temp;
    return;
  }
  while(current-> next != NULL){
    current = current->next;
  }
  temp->data = data;
  current-> next = temp;
}

void delete(int index){
  if(head == NULL) return;

  Node* temp = head;

  if(index == 0){
    head = head->next;
    free(temp);
    return;
  }

  for (int i = 0; temp != NULL && i < index - 1; i++) {
    temp = temp->next;
  }

  if(temp == NULL || temp-> next == NULL) return;
  Node* nodeToDelete = temp->next;
  temp->next = nodeToDelete->next;
  free(nodeToDelete);
  return;
}

void printList() {
  Node* temp = head;
  while (temp != NULL) {
    printf("%d -> ", temp->data);
    temp = temp->next;
  }
  printf("NULL\n");
}

int main(){

}