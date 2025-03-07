import * as React from 'react'
import { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import { createTodo, getTodo } from 'src/api/posts';
import './todo.css'

type Todos = {
  items: ReadonlyArray<{
    text: string,
  }>
  ts: number | string
}
const todoListOptions = queryOptions({
  queryKey: ['todos'],
  queryFn: getTodo,
})


function TodoList() {
  const queryClient = useQueryClient();
  const [text, setText] = React.useState('');
  const todoQuery = useQuery({ queryKey: ['todos'], queryFn: getTodo });

  const addTodoMutation = useMutation({
    mutationKey: ['addTodo'],
    mutationFn: async (newTodo: string) => {
      console.log(newTodo);
      return createTodo(newTodo);
    },
    onMutate: async (newTodo: string) => {
      setText('');
      await queryClient.cancelQueries(todoListOptions);
      const previousTodos = queryClient.getQueryData(todoListOptions.queryKey);
      console.log(previousTodos);
      if (previousTodos) {
        queryClient.setQueryData(todoListOptions.queryKey, {
          data: [...previousTodos.data, { id: Date.now(), title: newTodo }],
          ts: "Updating....",
        });
      }
      return { previousTodos };
    },
    onError: (err, variables, context) => {
      console.log(err);
      if (context?.previousTodos) {
        queryClient.setQueryData<Todos>(['todos'], context.previousTodos);
      }
    },
    onSuccess: (result, variables, context) => {
      // Optionally handle success
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  console.log(new Date(todoQuery.dataUpdatedAt).toLocaleTimeString())

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div className="d-flex justify-content-between">
        <div className="container data-list">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setText('');
              addTodoMutation.mutate(text);
            }}
          >
            <input
              type="text"
              onChange={(event) => setText(event.target.value)}
              value={text}
              style={{ padding: '8px', fontSize: '16px' }}
            />
            <button
              disabled={addTodoMutation.isPending}
              style={{ padding: '8px 16px', fontSize: '16px', marginLeft: '10px' }}
            >
              Create
            </button>
          </form>
          <br />
          {todoQuery.isPaused && <div><strong>Background fetching is paused (NO NETWORK)</strong></div>}
          {todoQuery.isRefetching && <div><strong>isRefetching....True</strong></div>}
          {todoQuery.isFetching && <div><strong>Fetching data in background...</strong></div>}
          {todoQuery.isPending && <strong>Loading...........</strong>}
          {todoQuery.error && (<><strong>{todoQuery.error.message} </strong>
            <p>Error Updated at : {new Date(todoQuery.errorUpdatedAt).toLocaleTimeString()} </p>
            <strong> Retry count : {todoQuery.failureCount}</strong>
          </>)}
          {todoQuery.isSuccess && (
            <>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                Last Updated At: {new Date(todoQuery.dataUpdatedAt).toLocaleTimeString()}
                {/* {todoQuery.data.ts
                  ? new Date(todoQuery.data.ts).toLocaleTimeString()
                  : addTodoMutation.isPending ? "Updating...." : addTodoMutation.isError ? "Error" : "No Data"} */}
              </div>
              <ol style={{ fontSize: '16px' }}>
                {addTodoMutation.isPending && (
                  <li style={{ opacity: 0.5, color: 'blue' }}>{addTodoMutation.variables}</li>
                )}
                {addTodoMutation.isError && (
                  <li style={{ color: 'red' }}>
                    {addTodoMutation.variables} <span></span>
                    <button
                      onClick={() =>
                        addTodoMutation.mutate(addTodoMutation.variables)
                      }
                      style={{ marginLeft: '10px', padding: '4px 8px', fontSize: '14px' }}
                    >
                      Retry
                    </button>
                  </li>

                )}
                {todoQuery.data?.data?.slice().reverse().map((todo) => (
                  <React.Fragment key={todo.id}>
                    <li>{todo.title}</li>
                  </React.Fragment>
                ))}
              </ol>
            </>
          )}

        </div>
        <div className="vr"></div>
        <div className="container">
          <h4 style={{ fontSize: '20px', fontWeight: 'bold' }}>For Getting the Data</h4>
          <ul style={{ listStyleType: 'none', padding: '0', fontSize: '16px' }}>
            <li>
              status : <strong >{todoQuery.status}</strong>
            </li>
            <li>
              isLoading :{' '}
              {todoQuery.isLoading ? <strong  > "Loading....."</strong> : 'false'}
            </li>
            <li>
              isError : <strong  >{todoQuery.isError ? 'true' : 'false'}</strong>
            </li>
            <li>
              isSuccess : <strong  >{todoQuery.isSuccess ? 'success' : 'false'}</strong>
            </li>
            <li>
              fetchStatus : <strong  >{todoQuery.fetchStatus}</strong>
            </li>
            <li>
              isFetching : <strong  >{todoQuery.isFetching ? 'true' : 'false'}</strong>
            </li>
            <li>
              isPaused : <strong  >{todoQuery.isPaused ? 'true' : 'false'}</strong>
            </li>
            <li>
              isPending : <strong  >{todoQuery.isPending ? 'true' : 'false'}</strong>
            </li>
          </ul>
        </div>
        <hr />
        <div className="vr"></div>
        <div className="container">
          <h4 style={{ fontSize: '20px', fontWeight: 'bold' }}>After Updating Status</h4>
          <ul style={{ listStyleType: 'none', padding: '0', fontSize: '16px' }}>
            <li>
              status : <strong  >{addTodoMutation.status}</strong>
            </li>
            <li>
              isPending :{' '}
              {addTodoMutation.isPending ? <strong> Loading.....</strong> : 'false'}
            </li>
            <li>
              isError : <strong  >{addTodoMutation.isError ? 'true' : 'false'}</strong>
            </li>
            <li>
              isSuccess : <strong  >{addTodoMutation.isSuccess ? 'true' : 'false'}</strong>
            </li>
            <li>
              isIdle : <strong  >{addTodoMutation.isIdle ? 'true' : 'false'}</strong>
            </li>
            <li>
              isPaused : <strong  >{addTodoMutation.isPaused ? 'true' : 'false'}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;

