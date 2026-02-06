const { processActivity, __setActivityModel } =
  require('../src/services/activityProcessor');

describe('processActivity', () => {
  it('should insert activity into DB with processedAt and id', async () => {
    const mockCreate = jest.fn().mockResolvedValue({ _id: '123' });

    const mockModel = {
      create: mockCreate,
    };

    // Inject mock model instead of mongoose model
    __setActivityModel(mockModel);

    const data = {
      userId: 'u1',
      eventType: 'login',
      timestamp: '2023-10-27T10:00:00Z',
      payload: { device: 'desktop' },
    };

    await processActivity(data);

    expect(mockCreate).toHaveBeenCalledTimes(1);

    const insertedDoc = mockCreate.mock.calls[0][0];

    expect(insertedDoc.userId).toBe('u1');
    expect(insertedDoc.eventType).toBe('login');
    expect(insertedDoc.payload.device).toBe('desktop');
    expect(insertedDoc.id).toBeDefined();
    expect(insertedDoc.processedAt).toBeDefined();
  });
});
