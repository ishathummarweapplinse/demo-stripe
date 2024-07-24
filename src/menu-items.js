const menuItems = {
  items: [
    {
      id: 'navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'BankInfo',
          title: 'Bank Info',
          type: 'item',
          icon: 'feather icon-home ',
          url: '/app/BankInfo/default'
        }
      ]
     },
    {
      id: 'Events',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'events',
          title: 'Events',
          type: 'item',
          icon: 'fa fa-th-large',
          url: '/app/Events/default'
        }
      ]
    },
    {
      id: 'BookEvenets',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'bookevents',
          title: 'bookevents',
          type: 'item',
          icon: 'fa fa-user',
          url: '/app/bookevent'
        }
      ]
    },
    // {
    //   id: 'user',
    //   type: 'group',
    //   icon: 'icon-navigation',
    //   children: [
    //     {
    //       id: 'user',
    //       title: 'User',
    //       type: 'item',
    //       icon: 'fa fa-user',
    //       url: '/app/user/default'
    //     }
    //   ]
    // },
    // {
    //   id: 'games',
    //   type: 'group',
    //   icon: 'icon-navigation',
    //   children: [
    //     {
    //       id: 'games',
    //       title: 'Games',
    //       type: 'item',
    //       icon: 'fas fa-dice-d20',
    //       url: '/app/games/default'
    //     }
    //   ]
    // },
    {
      id: 'withdraw_amount ',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'withdraw_amount ',
          title: 'withdraw_amount',
          type: 'item',
          icon: 'fa fa-dollar',
          url: '/app/Withdrw'
        }
      ]
    },
    // {
    //   id: 'transactions',
    //   type: 'group',
    //   icon: 'icon-navigation',
    //   children: [
    //     {
    //       id: 'transactions',
    //       title: 'Transactions',
    //       type: 'item',
    //       icon: 'fa fa-exchange',
    //       url: '/app/transactions/default'
    //     }
    //   ]
    // }
    
  ]
};

export default menuItems;
