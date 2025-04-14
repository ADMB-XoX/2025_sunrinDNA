#include <stdio.h>
#include <stdlib.h>

#define MAX 100

void inputArray(int arr[][MAX],int *row,int col){
  int newRow[col];
  for(int i=0;i<col;i++){
    scanf("%d",&newRow[i]);
  }

  

}

int main(){
  int arr[MAX][MAX];
  int row, column;
  scanf("%d %d", &row, &column);

  int count = 1;
  for(int i=0;i<row;i++){ //초기값 설정
    for(int j=0;j<column;j++){
      arr[i][j]=count++;
    }
  }

  inputArray(arr,row,column);


}