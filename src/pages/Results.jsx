import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../context/Web3Context';

const Results = () => {
  const { votingContract, candidateMedia } = useContext(Web3Context);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  const fetchResults = async () => {
    if (!votingContract) return;
    setLoading(true);
    try {
      const total = await votingContract.tongUngVien();
      const list = await Promise.all(
        Array.from({ length: Number(total) }, (_, i) => votingContract.dsUngVien(i + 1))
      );
      
      const formatted = list
        .map((c) => ({
          id: Number(c.id),
          name: c.hoTen,
          mssv: c.mssv,
          major: c.nganh,
          votes: Number(c.soPhieu),
          isActive: c.dangHoatDong,
          image: c.anh || candidateMedia?.[Number(c.id)],
          bio: c.moTa,
        }))
        .filter((c) => c.isActive)
        .sort((a, b) => b.votes - a.votes);

      const total_votes = formatted.reduce((sum, c) => sum + c.votes, 0);
      setCandidates(formatted);
      setTotalVotes(total_votes);
    } catch (error) {
      console.error('Lỗi tải kết quả:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [votingContract]);

  const getPercentage = (votes) => {
    if (totalVotes === 0) return 0;
    return ((votes / totalVotes) * 100).toFixed(1);
  };

  const getMedalColor = (rank) => {
    if (rank === 0) return 'from-yellow-400 to-yellow-600';
    if (rank === 1) return 'from-gray-300 to-gray-500';
    if (rank === 2) return 'from-orange-400 to-orange-600';
    return 'from-blue-400 to-blue-600';
  };

  const getMedalEmoji = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return '🏅';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto py-12 px-4 relative z-10 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-blue-200/50 dark:border-blue-500/30 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Cập nhật trực tiếp</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Kết quả
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Bầu chọn
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Bảng xếp hạng được cập nhật tự động từ blockchain
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {candidates.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ứng viên</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {totalVotes}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tổng phiếu</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Đang tải kết quả...</p>
            </div>
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-xl font-bold text-gray-600 dark:text-gray-400">Chưa có ứng viên nào</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {candidates.length >= 3 && (
              <div className="mb-16 max-w-5xl mx-auto">
                <div className="grid grid-cols-3 gap-4 items-end">
                  {/* 2nd Place */}
                  <div className="animate-scaleIn" style={{ animationDelay: '0.1s' }}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="text-6xl mb-4 text-center">🥈</div>
                        {candidates[1].image && (
                          <img src={candidates[1].image} alt={candidates[1].name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-300" />
                        )}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">{candidates[1].name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">{candidates[1].major}</p>
                        <div className="text-center">
                          <div className="text-3xl font-black text-gray-600 dark:text-gray-300">{candidates[1].votes}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">phiếu bầu</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="animate-scaleIn">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border-4 border-yellow-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                            👑 Dẫn đầu
                          </div>
                        </div>
                        <div className="text-7xl mb-4 text-center animate-bounce">🥇</div>
                        {candidates[0].image && (
                          <img src={candidates[0].image} alt={candidates[0].name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-400" />
                        )}
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white text-center mb-2">{candidates[0].name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">{candidates[0].major}</p>
                        <div className="text-center">
                          <div className="text-4xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{candidates[0].votes}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">phiếu bầu</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="animate-scaleIn" style={{ animationDelay: '0.2s' }}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="text-6xl mb-4 text-center">🥉</div>
                        {candidates[2].image && (
                          <img src={candidates[2].image} alt={candidates[2].name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-orange-400" />
                        )}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">{candidates[2].name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">{candidates[2].major}</p>
                        <div className="text-center">
                          <div className="text-3xl font-black text-orange-600 dark:text-orange-400">{candidates[2].votes}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">phiếu bầu</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Leaderboard */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-10"></div>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Bảng xếp hạng</h3>
                    <button
                      onClick={fetchResults}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Làm mới
                    </button>
                  </div>

                  <div className="space-y-4">
                    {candidates.map((candidate, index) => (
                      <div
                        key={candidate.id}
                        className="group relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-center gap-4">
                          {/* Rank */}
                          <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${getMedalColor(index)} rounded-xl flex items-center justify-center shadow-lg`}>
                            <span className="text-3xl">{getMedalEmoji(index)}</span>
                          </div>

                          {/* Avatar */}
                          {candidate.image && (
                            <img
                              src={candidate.image}
                              alt={candidate.name}
                              className="w-16 h-16 rounded-xl object-cover border-2 border-white dark:border-gray-700"
                            />
                          )}

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                {candidate.name}
                              </h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">#{index + 1}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{candidate.major}</p>
                            
                            {/* Progress Bar */}
                            <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                                style={{ width: `${getPercentage(candidate.votes)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Votes */}
                          <div className="text-right">
                            <div className="text-2xl font-black text-gray-900 dark:text-white">
                              {candidate.votes}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {getPercentage(candidate.votes)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
