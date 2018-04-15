'use strict';

/**
 * Luggagebeacon.js controller
 *
 * @description: A set of functions called "actions" for managing `Luggagebeacon`.
 */

module.exports = {
  /**
   * Retrieve luggagebeacon records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    const data = await strapi.services.luggagebeacon.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a luggagebeacon record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.luggagebeacon.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an luggagebeacon record.
   *
   * @return {Object}
   */

  create: async ctx => {
    const data = await strapi.services.luggagebeacon.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an luggagebeacon record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    const data = await strapi.services.luggagebeacon.edit(
      ctx.params,
      ctx.request.body
    );

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an luggagebeacon record.
   *
   * @return {Object}
   */

  destroy: async (ctx) => {
    const data = await strapi.services.luggagebeacon.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
