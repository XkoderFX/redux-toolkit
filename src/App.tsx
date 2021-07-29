import {
    Box,
    Button,
    Center,
    ChakraProvider,
    Divider,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    List,
    ListItem,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    UnorderedList,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import store from './redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { CheckIcon } from '@chakra-ui/icons';
import {
    addToDo,
    addTodoAsync,
    deleteTodo,
    getTodosAsync,
    ToDoReducer,
    toggleTodo,
    toggleToDoAsync,
} from './redux/todoSlice';
function App() {
    const [value, setValue] = useState('');
    const handleClick = () => {
        dispatch(addTodoAsync(value));
    };

    const dispatch = useDispatch();
    const todos = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.todos
    ) as ReturnType<typeof ToDoReducer>;

    const completedTodos = useMemo(() => {
        return todos.filter((todo) => todo.completed).length;
    }, [todos]);

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    return (
        <ChakraProvider>
            <Center h="100vh">
                <Box d="flex" flexDirection="column">
                    <Heading lineHeight="2rem" size="lg">
                        Todos
                    </Heading>
                    <List spacing={3} p="3">
                        {todos.map(({ id, title, completed }) => {
                            return (
                                <Box
                                    key={id}
                                    border="1px"
                                    p="0.25rem"
                                    borderColor="gray.200"
                                    borderRadius="0.50rem"
                                >
                                    <Flex align="center">
                                        <IconButton
                                            colorScheme={
                                                completed ? 'green' : 'gray'
                                            }
                                            mr={2}
                                            icon={<CheckIcon />}
                                            onClick={() => {
                                                dispatch(
                                                    toggleToDoAsync({
                                                        todoId: id,
                                                        completed: !completed,
                                                    })
                                                );
                                            }}
                                            aria-label="mark todo as completed"
                                        ></IconButton>
                                        <ListItem fontSize="20px" flex="1">
                                            {title}
                                        </ListItem>
                                        <Button
                                            onClick={() =>
                                                dispatch(deleteTodo({ id }))
                                            }
                                            colorScheme="red"
                                        >
                                            Delete
                                        </Button>
                                    </Flex>
                                </Box>
                            );
                        })}
                    </List>
                    <Stat>
                        <StatLabel>completed todos</StatLabel>
                        <StatNumber>{completedTodos}</StatNumber>
                    </Stat>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            value={value}
                            onInput={(e) => setValue(e.currentTarget.value)}
                            placeholder="Enter todo name"
                        />
                        <Button ml="0.25rem" onClick={handleClick}>
                            Add
                        </Button>
                    </InputGroup>
                </Box>
            </Center>
        </ChakraProvider>
    );
}

export default App;
