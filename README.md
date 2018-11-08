# LW

## Basic instructions

Clone this repo to your machine and run it locally by running the command `npn run serve`. The script is already setup to work on both mac and windows machines.

## Method

To initialise this repo, I used a basic boiler-plate where I assumed the need for a store (in haste and with the knowledge that I was being tested on my ability to setup react and redux). Upon realising that I did not need to update the JSON object which contained the initial balance, I opted to use local component state, as opposed to the global state. This eliminated the need for any actions/reducers/connected components. The increaseBalance and decreaseBalance functions were created and attached to the buttons on the page. Finally a negativeBalanceCheck function was created that would check whether the balance has gone from non-negative to negative, upon each update.
