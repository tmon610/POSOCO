# POSOCO

See the Presentation at https://docs.google.com/presentation/d/1qLUxU42UAz1uTsuc_nn9dhUIUk0gp0ZM3Kqv8y0hDpE/edit?usp=sharing

![Grid Assistant UI Snapshot](https://github.com/tmon610/POSOCO/raw/master/img/grid_assistant_ui.png)

![Grid Assistant UI Snapshot 2](https://github.com/tmon610/POSOCO/raw/master/img/grid_assistant_ui_2.png)

## Todos
1. Sort messages by voltage levels -- done
2. All monitoring functions should be run in parallel/Series and then after all functions are executed, display all the suggestions -- done
3. Define Global variables to decide category priorities, since we are dealing more than one case now -- done
4. Create a suggestion management framework. For now create a toggle button to strike off a suggestion. To make this possible we should take care that (category, pntId) is unique for a suggestion -- done
5. Create a table of sorted voltages as described in the slides
6. Bug found in strike through array. Solution can be to discard the faulty strike off object from list while adding itself -- done