'use strict';

/**
 * Luggagewatcher.js controller
 *
 * @description: A set of functions called "actions" for managing `Luggagewatcher`.
 */

module.exports = { 
  /**
   * Retrieve luggagewatcher records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.luggagewatcher.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a luggagewatcher record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.luggagewatcher.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an luggagewatcher record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.luggagewatcher.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an luggagewatcher record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.luggagewatcher.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an luggagewatcher record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.luggagewatcher.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
