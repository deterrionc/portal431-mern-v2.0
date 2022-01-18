export const formatCategories = () => {
  return [
    {
      id: 100,
      text: 'Audio',
      children: [
        {
          id: 101,
          text: 'HeadPhones',
        },
        {
          id: 102,
          text: 'Computer Speakers',
          isLeaf: true
        },
        {
          id: 103,
          text: 'Bluetooth Speakers',
          isLeaf: true
        },
        {
          id: 104,
          text: 'Audio Cables',
          isLeaf: true
        },
      ]
    },
    {
      id: 200,
      text: 'Cameras',
      children: [
        {
          id: 201,
          text: 'Carrot',
          isLeaf: true
        },
      ]
    },
    {
      id: 300,
      text: 'Batteries',
      children: [
        {

        }
      ]
    },
    {
      id: 400,
      text: 'Office Equipment',
      children: [
        {

        }
      ]
    },
    {
      id: 500,
      text: 'OutDoor',
      children: [
        {

        }
      ]
    },
  ]
}