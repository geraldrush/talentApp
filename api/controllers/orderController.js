export const createOrder = (req, res) => {
    const order = req.body;
  
    orders.push({ ...order, id: uuidv4() });
  
    res.send(`Order with the ordername ${order.firstName} was created`);
  };
  
  export const getOrders = (req, res) => {
    res.send(orders);
  };
  
  export const getOrder = (req, res) => {
    const { id } = req.params;
  
    const foundOrder = orders.find((order) => order.id === id);
  
    res.send(foundOrder);
  };
  
  export const deleteOrder = (req, res) => {
    const { id } = req.params;
  
    orders = orders.filter((order) => order.id !== id);
  
    res.send(`Order with id ${id} deleted from the database`);
  };
  
  export const patchOrder = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const order = orders.find((order) => order.id === id);
  
    if (firstName) {
      order.firstName = firstName;
    }
  
    if (lastName) {
      order.lastName = lastName;
    }
  
    if (age) {
      order.age = age;
    }
  
    res.send(`Order with the id ${id} has been updated`);
  };
  