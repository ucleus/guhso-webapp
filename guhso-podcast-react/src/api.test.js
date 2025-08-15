describe('API base URL', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.REACT_APP_API_URL = '';
  });

  afterEach(() => {
    delete global.fetch;
  });

  it('defaults to guhso.com when env var is unset', async () => {
    const mockResponse = { ok: true, json: async () => ({ data: [] }) };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    const { fetchEpisodes } = require('./api');
    await fetchEpisodes();
    expect(global.fetch).toHaveBeenCalledWith('https://guhso.com/api/v1/episodes');
  });
});
