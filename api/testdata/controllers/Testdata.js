'use strict';

/**
 * Testdata.js controller
 *
 * @description: A set of functions called "actions" for managing `Testdata`.
 */

module.exports = {

  /**
   * Retrieve testdata records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.testdata.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a testdata record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const data = await strapi.services.testdata.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an testdata record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.testdata.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an testdata record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.testdata.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an testdata record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.testdata.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
