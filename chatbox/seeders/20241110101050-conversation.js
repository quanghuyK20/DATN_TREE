'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Conversations',
      [
          {
            sender_id: 1,
            receiver_id: 2,
          },
          {
            sender_id: 1,
            receiver_id: 2,
          },
          {
            sender_id: 1,
            receiver_id: 2,
          },
          {
            sender_id: 1,
            receiver_id: 2,
          },
          {
            sender_id: 1,
            receiver_id: 2,
          },
      ],
      {},
  )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};